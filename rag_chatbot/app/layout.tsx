import "./global.css"

export const metadata = {
    title: "F1 gpt",
    description: "The place for all of your F1 questions"
}

const RootLayout = ({children}) => {
    return (
        <html lang="en">
            <body>
                {children}</body>
        </html>
    )
}

export default RootLayout