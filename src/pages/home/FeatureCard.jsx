
import "./featureCard.scss"

export default function FeatureCard({
    google_icon,
    text
}){
    return(
        <div className="feature-card">
            <span class="material-symbols-outlined">
                {google_icon}
            </span>
            <p>
                {text}
            </p>
        </div>
    )
}