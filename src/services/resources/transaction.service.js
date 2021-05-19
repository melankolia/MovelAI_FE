import MainInstance from '../main.instance';
import { TRANSACTION } from '../constant';

const TransactionService = {
    checkout(data) {
        return MainInstance.post(TRANSACTION, data);
    },
    getHistory(params) {
        return MainInstance.query(TRANSACTION, { params });
    }
};

export default TransactionService;