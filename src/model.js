import Falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';

export default falcorPath => new Falcor.Model({ source: new FalcorDataSource(falcorPath) });
