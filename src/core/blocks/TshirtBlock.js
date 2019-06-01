import React from 'react'
import { useI18n } from 'core/i18n/i18nContext'
import ReactMarkdown from 'react-markdown/with-html'

const images = ['tshirt1.png', 'tshirt2.png', 'tshirt3.png']
const TshirtBlock = () => {
    const { translate } = useI18n()

    return (
        <div className="Tshirt">
            <div className="Tshirt__Images">
                {images.map((image, i) => (
                    <div className={`Tshirt__Image Tshirt__Image${i}`}>
                        <img src={`/images/${image}`} alt={translate('tshirt.stateofcss')} />
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