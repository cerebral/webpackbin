import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from '../common.css'
import Input from 'components/Input'
import Checkbox from 'components/Checkbox'
import Description from 'components/Description'

export default connect({
  config: state`bin.currentBin.loaders.css`,
  loaderConfigChanged: signal`bin.configure.loaderConfigChanged`
},
  function CssLoader ({
    config,
    loaderConfigChanged
  }) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.info}>
          By default import any css file and they are
          inserted as style tags.
        </div>
        <div className={styles.section}>
          <Checkbox
            disabled={!config}
            checked={config && config.modules}
            onChange={() => {
              loaderConfigChanged({
                loaderName: 'css',
                configName: 'modules',
                configValue: !config.modules
              })
            }}
          >
            CSS Modules
          </Checkbox>
          <Description>
            Import CSS file as object with class names
          </Description>
        </div>
        <div className={styles.section}>
          <Checkbox
            disabled={!config}
            checked={config && config.less}
            onChange={() => {
              loaderConfigChanged({
                loaderName: 'css',
                configName: 'less',
                configValue: !config.less
              })
            }}
          >
            Less
          </Checkbox>
          <Description>
            Import .less files transpiled to style tags
          </Description>
        </div>
        <div className={styles.section}>
          <Checkbox
            disabled={!config}
            checked={config && config.sass}
            onChange={() => {
              loaderConfigChanged({
                loaderName: 'css',
                configName: 'sass',
                configValue: !config.sass
              })
            }}
          >
            Sass
          </Checkbox>
          <Description>
            Import .sass files transpiled to style tags
          </Description>
        </div>
      </div>
    )
  }
)
