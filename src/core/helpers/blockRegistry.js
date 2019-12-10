// generic charts
import HorizontalBarBlock from 'core/blocks/generic/HorizontalBarBlock'
import VerticalBarBlock from 'core/blocks/generic/VerticalBarBlock'

// other
import TextBlock from 'core/blocks/other/TextBlock'
import SponsoredResourcesBlock from 'core/blocks/other/SponsoredResourcesBlock'
import HeatmapBlock from 'core/blocks/generic/HeatmapBlock'
import PageIntroductionBlock from 'core/blocks/other/PageIntroductionBlock'
// import { HappinessTrendBlock } from 'modules/happiness'

// demographics
import ParticipationByCountryBlock from 'core/blocks/demographics/ParticipationByCountryBlock'
import GenderBlock from 'core/blocks/demographics/GenderBlock'

// features
import FeatureExperienceBlock from 'core/blocks/features/FeatureExperienceBlock'
// import FeaturesOverviewBlock from 'core/blocks/features/FeaturesOverviewBlock'
// import FeaturesRadialClusterOverviewBlock from 'core/blocks/features/FeaturesRadialClusterOverviewBlock'
// import FeaturesSectionOverviewBlock from 'core/blocks/features/FeaturesSectionOverviewBlock'
// import FeaturesUsageRatioBlock from 'core/blocks/features/FeaturesUsageRatioBlock'

// tools
import ToolExperienceBlock from 'core/blocks/tools/ToolExperienceBlock'
// import ToolsOverviewBlock from 'core/blocks/tools/ToolsOverviewBlock'
// import ToolsScatterplotBlock from 'core/blocks/tools/ToolsScatterplotBlock'
// import ToolsSectionOverviewBlock from 'core/blocks/tools/ToolsSectionOverviewBlock'
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

    // other
    PageIntroductionBlock,
    TextBlock,
    SponsoredResourcesBlock,

    // demographics
    ParticipationByCountryBlock,
    GenderBlock,

    // features
    FeatureExperienceBlock,
    // 'features-overview': FeaturesOverviewBlock,
    // 'features-radial-cluster-overview': FeaturesRadialClusterOverviewBlock,
    // 'features-section-overview': FeaturesSectionOverviewBlock,
    // 'features-usage-ratio': FeaturesUsageRatioBlock,

    // tools
    ToolExperienceBlock,
    // 'tools-overview': ToolsOverviewBlock,
    // 'tools-scatterplot': ToolsScatterplotBlock,
    // 'tools-section-overview': ToolsSectionOverviewBlock,
    // 'opinions-over-time': ToolOpinionsOverTimeBlock,
    // 'tools-scaled-ranking-section-overview': ToolsScaledRankingSectionOverviewBlock,
    // 'tools-usage-ratio': ToolsUsageRatioBlock,

    // happiness
    HappinessBlock,

    // opinions
    OpinionBlock,
}

export default blockRegistry
