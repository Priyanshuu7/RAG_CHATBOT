"use client"
import Image from "next/image"
import F1_logo from "./assets/F1_logo.png"

import {useChat} from "ai/react"
import {Message} from "ai"

const Home = () => {

    const {append, isLoading, messages, input, handleInputChange, handleSubmit} = useChat()

    const noMessages = messages.length === 0

    return ( 

        <main>
            <Image src={F1_logo} width="250" alt="F1 image"/>

        <section> 
                {noMessages ? (
                    <>
                    <p className="starter-text">
                        Hey there this is the ultimate F1 chat bot
                    </p>
                    <br />
                    {/* <PromtSuggestionsRow/> */}
                    </>

                ) : (
                    <>

                    {/* map messgaes onto bublues */}
                    {/* <LoadingBubble/> */}
                    </>

                )}

                <form onSubmit={handleSubmit}>
                    <input className="question-box" onChange={handleInputChange} value={input} placeholder="Ask me somthing"/>
                    <input type="submit"/>


                </form>
            </section>
        </main>
    )
}
export default Home