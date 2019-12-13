import React from 'react'
import PropTypes from 'prop-types'
import BlockLegendsItem from './BlockLegendsItem'
import { useI18n } from 'core/i18n/i18nContext'
import { keys } from 'core/constants.js'

const BlockLegends = ({
    block,
    layout = 'horizontal',
    withFrame,
    chipSize,
    style,
    itemStyle,
    chipStyle,
    onMouseEnter,
    onMouseLeave,
    onClick,
    data,
    units
}) => {
    const { id: blockId, bucketKeysName = blockId } = block

    const { translate } = useI18n()
    const blockKeys = keys[bucketKeysName]

    if (!blockKeys) {
        throw new Error(`Could not find any keys defined for ${bucketKeysName}. If there are none, set "showLegend: false" on block definition.`)
    }

    const classNames = ['Legends', `Legends--${layout}`]
    if (withFrame === true) {
        classNames.push('Legends--withFrame')
    }

    const blockLegends = blockKeys.map(({ id: keyId, color }) => ({
        id: `${bucketKeysName}.${keyId}`,
        label: translate(`${bucketKeysName}.${keyId}.long`),
        keyLabel: `${translate(`${bucketKeysName}.${keyId}.short`)}:`,
        color
    }))

    const rootStyle = { ...style }

    return (
        <div className={classNames.join(' ')} style={rootStyle}>
            {blockLegends.map(({ id, label, color, keyLabel }) => (
                <BlockLegendsItem
                    key={id}
                    id={id}
                    label={label}
                    color={color}
                    style={itemStyle}
                    chipSize={chipSize}
                    chipStyle={chipStyle}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                    keyLabel={keyLabel}
                    data={data && Array.isArray(data) && data.find(b => b.id === id)}
                    units={units}
                />
            ))}
        </div>
    )
}

BlockLegends.propTypes = {
    legends: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
            keyLabel: PropTypes.string,
            color: PropTypes.string
        })
    ).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    withFrame: PropTypes.bool.isRequired,
    chipSize: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    itemStyle: PropTypes.object.isRequired,
    chipStyle: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func
}

BlockLegends.defaultProps = {
    layout: 'horizontal',
    withFrame: true,
    style: {},
    itemStyle: {},
    chipStyle: {},
    chipSize: 16
}

export default BlockLegends
