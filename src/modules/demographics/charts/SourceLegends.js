import React, { memo } from 'react'
import Legends from 'core/charts/Legends'

const SourceLegends = ({ sources }) => <Legends legends={sources} modifier="horizontal" />

export default memo(SourceLegends)
