
import "./home.scss"
import { Link } from "react-router-dom"
import logo from "../../assets/images/rice-bowl-icon.svg"
import FeatureCard from "./FeatureCard"


export default function Home(){
    return(
        <div className="home-main">
            <div className="home-primary">
                <h1>Welcome to AlgoRiceCMS</h1>
                <p className="label">Manage your posts in AlgoRice with our dashboard and editor. Please note that only writers are allowed to draft/post, but everyone is free to write whatever and preview how their post will look like</p>
                <Link class="button" to="/create">Create</Link>


            </div>
            <div className="home-secondary">
                <h2>Features</h2>
                <div className="features">
                    <FeatureCard
                        google_icon="markdown"
                        text="Format your text to using Markdown."
                    />
                    <FeatureCard
                        google_icon="draft"
                        text="Draft your posts to save your work"
                    />
                    <FeatureCard 
                        google_icon="preview"
                        text="Preview your work as your write"
                    />
                </div>

                {/* <img src={logo}></img> */}
            </div>                
        </div>
    )
}