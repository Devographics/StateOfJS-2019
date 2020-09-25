// generic charts
import HorizontalBarBlock from 'core/blocks/generic/HorizontalBarBlock'
import VerticalBarBlock from 'core/blocks/generic/VerticalBarBlock'
import HeatmapBlock from 'core/blocks/generic/HeatmapBlock'

// other
import TextBlock from 'core/blocks/other/TextBlock'
import RecommendedResourcesBlock from 'core/blocks/other/RecommendedResourcesBlock'
import PageIntroductionBlock from 'core/blocks/other/PageIntroductionBlock'
import SurveyIntroBlock from 'core/blocks/other/SurveyIntroBlock'
import TshirtBlock from 'core/blocks/other/TshirtBlock'
import AwardBlock from 'core/blocks/awards/AwardBlock'
import ConclusionBlock from 'core/blocks/other/ConclusionBlock'

// demographics
import ParticipationByCountryBlock from 'core/blocks/demographics/ParticipationByCountryBlock'
import GenderBlock from 'core/blocks/demographics/GenderBlock'

// features
import FeatureExperienceBlock from 'core/blocks/features/FeatureExperienceBlock'
import FeaturesOverviewBlock from 'core/blocks/features/FeaturesOverviewBlock'

// tools
import ToolHeaderBlock from 'core/blocks/tools/ToolHeaderBlock'
import ToolExperienceBlock from 'core/blocks/tools/ToolExperienceBlock'
import ToolExperienceGraphBlock from 'core/blocks/tools/ToolExperienceGraphBlock'
import ToolsSectionOverviewBlock from 'core/blocks/tools/ToolsSectionOverviewBlock'
import ToolsExperienceRankingBlock from 'core/blocks/tools/ToolsExperienceRankingBlock'
import ToolsScatterplotBlock from 'core/blocks/tools/ToolsScatterplotBlock'
import ToolsArrowsBlock from 'core/blocks/tools/ToolsArrowsBlock'

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
    RecommendedResourcesBlock,
    TshirtBlock,
    SurveyIntroBlock,
    AwardBlock,
    ConclusionBlock,

    // demographics
    ParticipationByCountryBlock,
    GenderBlock,

    // features
    FeatureExperienceBlock,
    FeaturesOverviewBlock,

    // tools
    ToolHeaderBlock,
    ToolExperienceBlock,
    ToolExperienceGraphBlock,
    ToolsSectionOverviewBlock,
    ToolsExperienceRankingBlock,
    ToolsScatterplotBlock,
    ToolsArrowsBlock,

    // happiness
    HappinessBlock,

    // opinions
    OpinionBlock
}

export default blockRegistry
