import Falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';

export default falcorModelPath => new Falcor.Model({ source: new FalcorDataSource(falcorModelPath) });
