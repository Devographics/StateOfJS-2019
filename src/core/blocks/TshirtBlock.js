import React from 'react'
import { useI18n } from 'core/i18n/i18nContext'
import ReactMarkdown from 'react-markdown/with-html'

const images = ['tshirt5.jpg', 'tshirt6.jpg', 'tshirt4.png']

const TshirtBlock = () => {
    const { translate } = useI18n()

    return (
        <div className="Tshirt">
            <div className="Tshirt__Images">
                {images.map((image, i) => (
                    <div key={i} className={`Tshirt__Image Tshirt__Image${i}`}>
                        <a href={`/images/tshirt/${image}`} target="_blank" rel="noopener noreferrer"><img src={`/images/tshirt/${image}`} alt={translate('tshirt.stateofcss')} /></a>
                    </div>
                ))}
            </div>
            <div className="Tshirt__Description">
                <h2>{translate('tshirt.about')}</h2>
                <div>
                <ReactMarkdown source={translate('tshirt.description')} escapeHtml={false} />
                </div>
                <a className="Button Tshirt__Button" href="#xxx">
                    {translate('tshirt.getit')}
                </a>
            </div>
        </div>
    )
}

export default TshirtBlock