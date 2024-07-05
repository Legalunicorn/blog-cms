//to take a string and produce markdown
import Markdown from "react-markdown"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import "./markdownPreview.scss"

export default function MarkdownPreview({
    body
}){
    //idk if i need this 
    body = body.replace(/\\n/g,'  \n')

    return (
        <Markdown
            children = {body}
            className="preview-body"
            components = {{
                code(props){
                    const {children,className,node,...rest} = props;
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                        <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children = {String(children).replace(/\n$/,"")}
                            language ={match[1]}
                            //style+{dark}
                        />
                    ) :(
                        <code {...rest} className={`${className} no-lang`}>
                            {children}
                        </code>
                    )
                }
            }}

        />
    )

}