// generic
import HorizontalBarBlock from 'core/blocks/HorizontalBarBlock'
import VerticalBarBlock from 'core/blocks/VerticalBarBlock'
import TextBlock from 'core/blocks/TextBlock'
import ResourcesBlock from 'core/blocks/ResourcesBlock'
import HeatmapBlock from 'core/blocks/HeatmapBlock'
import PageIntroductionBlock from 'core/blocks/PageIntroductionBlock'
import { OpinionBlock } from 'modules/opinions/blocks'
import { HappinessTrendBlock } from 'modules/happiness'

// demographics
// import SourceBlock from 'modules/demographics/blocks/SourceBlock'
import GenderBlock from 'modules/demographics/blocks/GenderBlock'
import ParticipationByCountryBlock from 'modules/demographics/blocks/ParticipationByCountryBlock'

// features
import FeaturesOverviewBlock from 'modules/features/blocks/FeaturesOverviewBlock'
// import FeaturesRadialClusterOverviewBlock from 'modules/features/blocks/FeaturesRadialClusterOverviewBlock'
import FeaturesSectionOverviewBlock from 'modules/features/blocks/FeaturesSectionOverviewBlock'
// import FeaturesUsageRatioBlock from 'modules/features/blocks/FeaturesUsageRatioBlock'
import FeatureBlock from 'modules/features/blocks/FeatureBlock'

// tools
import ToolsOverviewBlock from 'modules/tools/blocks/ToolsOverviewBlock'
import ToolsScatterplotBlock from 'modules/tools/blocks/ToolsScatterplotBlock'
import ToolsSectionOverviewBlock from 'modules/tools/blocks/ToolsSectionOverviewBlock'
// import ToolsScaledRankingSectionOverviewBlock from 'modules/tools/blocks/ToolsScaledRankingSectionOverviewBlock'
// import ToolsUsageRatioBlock from 'modules/tools/blocks/ToolsUsageRatioBlock'
import ToolBlock from 'modules/tools/blocks/ToolBlock'
import ToolOpinionsOverTimeBlock from 'modules/tools/blocks/ToolOpinionsOverTimeBlock'

const blockRegistry = {
    // generic
    'page-introduction': PageIntroductionBlock,
    'horizontal-bar': HorizontalBarBlock,
    'vertical-bar': VerticalBarBlock,
    'opinion-scale': OpinionBlock,
    text: TextBlock,
    resources: ResourcesBlock,
    heatmap: HeatmapBlock,

    // demographics
    // source: SourceBlock,
    gender: GenderBlock,
    'participation-by-country': ParticipationByCountryBlock,

    // features
    'features-overview': FeaturesOverviewBlock,
    // 'features-radial-cluster-overview': FeaturesRadialClusterOverviewBlock,
    'features-section-overview': FeaturesSectionOverviewBlock,
    // 'features-usage-ratio': FeaturesUsageRatioBlock,
    feature: FeatureBlock,

    // tools
    'tools-overview': ToolsOverviewBlock,
    'tools-scatterplot': ToolsScatterplotBlock,
    'tools-section-overview': ToolsSectionOverviewBlock,
    'opinions-over-time': ToolOpinionsOverTimeBlock,
    // 'tools-scaled-ranking-section-overview': ToolsScaledRankingSectionOverviewBlock,
    // 'tools-usage-ratio': ToolsUsageRatioBlock,
    tool: ToolBlock,

    // happiness
    'happiness-trend': HappinessTrendBlock
}

export default blockRegistry
