import React, { memo } from 'react'
import Legends from 'core/blocks/block/BlockLegends'

const SourceLegends = ({ sources }) => <Legends legends={sources} modifier="horizontal" />

export default memo(SourceLegends)
