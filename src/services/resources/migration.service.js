import MainInstance from '../main.instance';
import { MIGRATION } from '../constant';

const MigrationService = {
    importData(data) {
        return MainInstance.post(MIGRATION, data);
    }
};

export default MigrationService;