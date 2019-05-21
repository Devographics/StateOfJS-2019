// generic
import VerticalBarBlock from 'core/blocks/VerticalBarBlock'
import HorizontalBarBlock from 'core/blocks/HorizontalBarBlock'
import CountriesBlock from 'core/blocks/CountriesBlock'
import OpinionScaleBlock from 'core/blocks/OpinionScaleBlock'

// demographics
import SourceBreakdownBlock from 'modules/demographics/blocks/SourceBreakdownBlock'
import GenderBreakdownBlock from 'modules/demographics/blocks/GenderBreakdownBlock'

// features
import FeaturesOverviewBlock from 'modules/features/blocks/FeaturesOverviewBlock'
import FeaturesSectionOverviewBlock from 'modules/features/blocks/FeaturesSectionOverviewBlock'
import FeaturesUsageRatioBlock from 'modules/features/blocks/FeaturesUsageRatioBlock'
import FeatureBlock from 'modules/features/blocks/FeatureBlock'

// tools
import ToolsOverviewBlock from 'modules/tools/blocks/ToolsOverviewBlock'
import ToolsOverviewBlock2 from 'modules/tools/blocks/ToolsOverviewBlock2'
import ToolsOverviewBlock3 from 'modules/tools/blocks/ToolsOverviewBlock3'
import ToolsSectionOverviewBlock from 'modules/tools/blocks/ToolsSectionOverviewBlock'
import ToolsUsageRatioBlock from 'modules/tools/blocks/ToolsUsageRatioBlock'
import ToolOpinionBlock from 'modules/tools/blocks/ToolOpinionBlock'

const blockRegistry = {
    // generic
    'vertical-bar': VerticalBarBlock,
    'horizontal-bar': HorizontalBarBlock,
    countries: CountriesBlock,
    'opinion-scale': OpinionScaleBlock,

    //demographics
    source: SourceBreakdownBlock,
    gender: GenderBreakdownBlock,

    // features
    'features-overview': FeaturesOverviewBlock,
    'features-section-overview': FeaturesSectionOverviewBlock,
    'features-usage-ratio': FeaturesUsageRatioBlock,
    feature: FeatureBlock,

    // tools
    'tools-overview': ToolsOverviewBlock,
    'tools-overview2': ToolsOverviewBlock2,
    'tools-overview3': ToolsOverviewBlock3,
    'tools-section-overview': ToolsSectionOverviewBlock,
    'tools-usage-ratio': ToolsUsageRatioBlock,
    tool: ToolOpinionBlock
}

export default blockRegistry
