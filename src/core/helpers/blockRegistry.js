// generic
import HorizontalBarBlock from 'core/blocks/HorizontalBarBlock'
import CountriesBlock from 'core/blocks/CountriesBlock'
import OpinionScaleBlock from 'core/blocks/OpinionScaleBlock'
import RangeBreakdownBlock from 'core/blocks/RangeBreakdownBlock'

// demographics
import SourceBreakdownBlock from 'modules/demographics/blocks/SourceBreakdownBlock'
import GenderBreakdownBlock from 'modules/demographics/blocks/GenderBreakdownBlock'

// features
import FeaturesOverviewBlock from 'modules/features/blocks/FeaturesOverviewBlock'
import FeaturesRadialClusterOverviewBlock from 'modules/features/blocks/FeaturesRadialClusterOverviewBlock'
import FeaturesSectionOverviewBlock from 'modules/features/blocks/FeaturesSectionOverviewBlock'
import FeaturesUsageRatioBlock from 'modules/features/blocks/FeaturesUsageRatioBlock'
import FeatureBlock from 'modules/features/blocks/FeatureBlock'

// tools
import ToolsOverviewBlock from 'modules/tools/blocks/ToolsOverviewBlock'
import ToolsSectionOverviewBlock from 'modules/tools/blocks/ToolsSectionOverviewBlock'
import ToolsScaledRankingSectionOverviewBlock from 'modules/tools/blocks/ToolsScaledRankingSectionOverviewBlock'
import ToolsUsageRatioBlock from 'modules/tools/blocks/ToolsUsageRatioBlock'
import ToolOpinionBlock from 'modules/tools/blocks/ToolOpinionBlock'

const blockRegistry = {
    // generic
    'horizontal-bar': HorizontalBarBlock,
    countries: CountriesBlock,
    'opinion-scale': OpinionScaleBlock,
    'range-breakdown': RangeBreakdownBlock,

    //demographics
    source: SourceBreakdownBlock,
    gender: GenderBreakdownBlock,

    // features
    'features-overview': FeaturesOverviewBlock,
    'features-radial-cluster-overview': FeaturesRadialClusterOverviewBlock,
    'features-section-overview': FeaturesSectionOverviewBlock,
    'features-usage-ratio': FeaturesUsageRatioBlock,
    feature: FeatureBlock,

    // tools
    'tools-overview': ToolsOverviewBlock,
    'tools-section-overview': ToolsSectionOverviewBlock,
    'tools-scaled-ranking-section-overview': ToolsScaledRankingSectionOverviewBlock,
    'tools-usage-ratio': ToolsUsageRatioBlock,
    tool: ToolOpinionBlock
}

export default blockRegistry
