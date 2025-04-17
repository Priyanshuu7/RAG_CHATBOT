import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import {DataAPIClient} from "@datastax/astra-db-ts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

const ASTRA_DB_NAMESPACE = process.env.ASTRA_DB_NAMESPACE;
const ASTRA_DB_COLLECTION = process.env.ASTRA_DB_COLLECTION;
const ASTRA_DB_API_ENDPOINT = process.env.ASTRA_DB_API_ENDPOINT;
const ASTRA_DB_APPLICATION_TOKEN = process.env.ASTRA_DB_APPLICATION_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "embedding-001" });

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT, {keyspace: ASTRA_DB_NAMESPACE});

const splitter = new RecursiveCharacterTextSplitter({chunkSize: 512, chunkOverlap: 100})

const createcollection = async(SimilarityMetric : SimilarityMetric = "dot_product") => {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 768,
            metric: SimilarityMetric
        }
    })

    console.log(res)
}

// const deleteCollection = async() => {
//     try {
//         await db.dropCollection(ASTRA_DB_COLLECTION);
//         console.log("Collection deleted successfully");
//     } catch (error) {
//         console.log("Collection might not exist or error deleting:", error);
//     }
// }

const f1Data = [
    'https://en.wikipedia.org/wiki/Formula_One',
    'https://en.wikipedia.org/wiki/2023_Formula_One_World_Championship',
    'https://en.wikipedia.org/wiki/2022_Formula_One_World_Championship',
    'https://en.wikipedia.org/wiki/List_of_Formula_One_World_Drivers%27_Champions',
    'https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship',
    'https://www.formula1.com/en/results.html/2024/races.html',
    'https://www.formula1.com/en/racing/2024.html'
]

const loadSampleData = async() => {
    const collection = await db.collection(ASTRA_DB_COLLECTION);
    for await(const url of f1Data) {
        const content = await scrapePage(url);
        const chunks = await splitter.splitText(content);
        for await(const chunk of chunks) {
            try {
                const result = await model.embedContent(chunk);
                const vector = result.embedding.values;
                
                // Ensure the vector has the correct dimension
                if (vector.length !== 768) {
                    console.error(`Vector dimension mismatch: expected 768, got ${vector.length}`);
                    continue;
                }
          
                const res = await collection.insertOne({
                    $vector: vector,
                    text: chunk
                });
                console.log("Successfully inserted document");
                console.log(res.insertedId)
              
            } catch (error) {
                console.error("Error processing chunk:", error);
            }
        }
    }
};

const scrapePage = async (url: string) => {
    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // 👈 Add this
      },
      gotoOptions: {
        waitUntil: "domcontentloaded"
      },
      evaluate: async (page, browser) => {
        const result = await page.evaluate(() => document.body.innerHTML)
        await browser.close()
        return result
      }
    })
    return (await loader.scrape()).replace(/<[^>]*>?/g, "")
  }
  
  // deleteCollection().then(() => 
  //hey//
    
    createcollection().then(() => loadSampleData())
  
  // )