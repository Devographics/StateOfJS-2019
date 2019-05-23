import PropTypes from 'prop-types'
import FeaturesCirclePackingOverviewChart from './FeaturesCirclePackingChart'

// reuse chart component but keep separate file in order to define different propTypes
FeaturesCirclePackingOverviewChart.propTypes = {
    data: PropTypes.shape({
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                features: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        usage: PropTypes.shape({
                            total: PropTypes.number.isRequired,
                            buckets: PropTypes.arrayOf(
                                PropTypes.shape({
                                    id: PropTypes.string.isRequired,
                                    count: PropTypes.number.isRequired,
                                    percentage: PropTypes.number.isRequired
                                })
                            ).isRequired
                        }).isRequired
                    })
                )
            })
        )
    })
}

export default FeaturesCirclePackingOverviewChart