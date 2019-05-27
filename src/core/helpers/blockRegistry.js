// generic
import HorizontalBarBlock from 'core/blocks/HorizontalBarBlock'
import VerticalBarBlock from 'core/blocks/VerticalBarBlock'
import OpinionScaleBlock from 'core/blocks/OpinionScaleBlock'

// demographics
import SourceBreakdownBlock from 'modules/demographics/blocks/SourceBreakdownBlock'
import GenderBreakdownBlock from 'modules/demographics/blocks/GenderBreakdownBlock'
import ParticipationByCountryBlock from 'modules/demographics/blocks/ParticipationByCountryBlock'

// features
import FeaturesOverviewBlock from 'modules/features/blocks/FeaturesOverviewBlock'
import FeaturesRadialClusterOverviewBlock from 'modules/features/blocks/FeaturesRadialClusterOverviewBlock'
import FeaturesSectionOverviewBlock from 'modules/features/blocks/FeaturesSectionOverviewBlock'
import FeaturesUsageRatioBlock from 'modules/features/blocks/FeaturesUsageRatioBlock'
import FeatureBlock from 'modules/features/blocks/FeatureBlock'

// tools
import ToolsOverviewBlock from 'modules/tools/blocks/ToolsOverviewBlock'
import ToolsScatterplotBlock from 'modules/tools/blocks/ToolsScatterplotBlock'
import ToolsSectionOverviewBlock from 'modules/tools/blocks/ToolsSectionOverviewBlock'
import ToolsScaledRankingSectionOverviewBlock from 'modules/tools/blocks/ToolsScaledRankingSectionOverviewBlock'
import ToolsUsageRatioBlock from 'modules/tools/blocks/ToolsUsageRatioBlock'
import ToolOpinionBlock from 'modules/tools/blocks/ToolOpinionBlock'

const blockRegistry = {
    // generic
    'horizontal-bar': HorizontalBarBlock,
    'vertical-bar': VerticalBarBlock,
    'opinion-scale': OpinionScaleBlock,

    // demographics
    source: SourceBreakdownBlock,
    gender: GenderBreakdownBlock,
    'participation-by-country': ParticipationByCountryBlock,

    // features
    'features-overview': FeaturesOverviewBlock,
    'features-radial-cluster-overview': FeaturesRadialClusterOverviewBlock,
    'features-section-overview': FeaturesSectionOverviewBlock,
    'features-usage-ratio': FeaturesUsageRatioBlock,
    feature: FeatureBlock,

    // tools
    'tools-overview': ToolsOverviewBlock,
    'tools-scatterplot': ToolsScatterplotBlock,
    'tools-section-overview': ToolsSectionOverviewBlock,
    'tools-scaled-ranking-section-overview': ToolsScaledRankingSectionOverviewBlock,
    'tools-usage-ratio': ToolsUsageRatioBlock,
    tool: ToolOpinionBlock
}

export default blockRegistry
