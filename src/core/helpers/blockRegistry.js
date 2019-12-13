// generic charts
import HorizontalBarBlock from 'core/blocks/generic/HorizontalBarBlock'
import VerticalBarBlock from 'core/blocks/generic/VerticalBarBlock'
import HeatmapBlock from 'core/blocks/generic/HeatmapBlock'
import GaugeBarBlock from 'core/blocks/generic/GaugeBarBlock'

// other
import TextBlock from 'core/blocks/other/TextBlock'
import SponsoredResourcesBlock from 'core/blocks/other/SponsoredResourcesBlock'
import PageIntroductionBlock from 'core/blocks/other/PageIntroductionBlock'
// import { HappinessTrendBlock } from 'modules/happiness'

// demographics
import ParticipationByCountryBlock from 'core/blocks/demographics/ParticipationByCountryBlock'

// features
import FeatureExperienceBlock from 'core/blocks/features/FeatureExperienceBlock'
import FeaturesOverviewBlock from 'core/blocks/features/FeaturesOverviewBlock'
// import FeaturesRadialClusterOverviewBlock from 'core/blocks/features/FeaturesRadialClusterOverviewBlock'
// import FeaturesSectionOverviewBlock from 'core/blocks/features/FeaturesSectionOverviewBlock'
// import FeaturesUsageRatioBlock from 'core/blocks/features/FeaturesUsageRatioBlock'

// tools
import ToolHeaderBlock from 'core/blocks/tools/ToolHeaderBlock'
import ToolExperienceBlock from 'core/blocks/tools/ToolExperienceBlock'
import ToolsSectionOverviewBlock from 'core/blocks/tools/ToolsSectionOverviewBlock'
import ToolsExperienceRankingBlock from 'core/blocks/tools/ToolsExperienceRankingBlock'
import ToolsScatterplotBlock from 'core/blocks/tools/ToolsScatterplotBlock'
// import ToolsScaledRankingSectionOverviewBlock from 'core/blocks/tools/ToolsScaledRankingSectionOverviewBlock'
// import ToolsUsageRatioBlock from 'core/blocks/tools/ToolsUsageRatioBlock'
// import ToolOpinionsOverTimeBlock from 'core/blocks/tools/ToolOpinionsOverTimeBlock'

// happiness
import HappinessBlock from 'core/blocks/happiness/HappinessBlock'

// opinions
import OpinionBlock from 'core/blocks/opinions/OpinionBlock'

const blockRegistry = {
    // generic chart blocks
    HorizontalBarBlock,
    VerticalBarBlock,
    HeatmapBlock,
    GaugeBarBlock,

    // other
    PageIntroductionBlock,
    TextBlock,
    SponsoredResourcesBlock,

    // demographics
    ParticipationByCountryBlock,

    // features
    FeatureExperienceBlock,
    FeaturesOverviewBlock,
    // 'features-radial-cluster-overview': FeaturesRadialClusterOverviewBlock,
    // 'features-section-overview': FeaturesSectionOverviewBlock,
    // 'features-usage-ratio': FeaturesUsageRatioBlock,

    // tools
    ToolHeaderBlock,
    ToolExperienceBlock,
    ToolsSectionOverviewBlock,
    ToolsExperienceRankingBlock,
    ToolsScatterplotBlock,
    // 'tools-section-overview': ToolsSectionOverviewBlock,
    // 'opinions-over-time': ToolOpinionsOverTimeBlock,
    // 'tools-scaled-ranking-section-overview': ToolsScaledRankingSectionOverviewBlock,
    // 'tools-usage-ratio': ToolsUsageRatioBlock,

    // happiness
    HappinessBlock,

    // opinions
    OpinionBlock
}

export default blockRegistry
