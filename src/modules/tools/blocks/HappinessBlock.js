import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import HappinessTrendChart from '../charts/HappinessTrendChart'

const chartId = 'tools_happiness'

export default class HappinessBlock extends PureComponent {
    static propTypes = {
        section: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                survey: PropTypes.string.isRequired,
                average: PropTypes.number.isRequired,
                scores: PropTypes.arrayOf(
                    PropTypes.shape({
                        score: PropTypes.number.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }

    render() {
        // const { data } = this.props

        const data = [
            {
                survey: '2016',
                average: 2.9,
                scores: [
                    { score: 3, count: 5102, percentage: 49.8 },
                    { score: 4, count: 2580, percentage: 25.2 },
                    { score: 2, count: 1986, percentage: 19.4 },
                    { score: 1, count: 378, percentage: 3.7 },
                    { score: 0, count: 160, percentage: 1.6 }
                ]
            },
            {
                survey: '2017',
                average: 3,
                scores: [
                    { score: 3, count: 10523, percentage: 44.5 },
                    { score: 4, count: 7447, percentage: 31.5 },
                    { score: 2, count: 4233, percentage: 17.9 },
                    { score: 1, count: 979, percentage: 4.1 },
                    { score: 0, count: 365, percentage: 1.5 }
                ]
            },
            {
                survey: '2018',
                average: 3.2,
                scores: [
                    { score: 3, count: 8806, percentage: 43.5 },
                    { score: 4, count: 7600, percentage: 37.5 },
                    { score: 2, count: 2567, percentage: 12.7 },
                    { score: 1, count: 324, percentage: 1.6 },
                    { score: 0, count: 237, percentage: 1.2 }
                ]
            }
        ]
        return (
            <Block id={chartId} className="Block--happiness Happiness__Block">
                <HappinessTrendChart data={data} />
            </Block>
        )
    }
}
