import MainInstance from '../main.instance';
import { RESTAURANT } from '../constant';

const RestaurantService = {
    getList(params) {
        return MainInstance.query(RESTAURANT, { params });
    },
    getDetail(id) {
        return MainInstance.fetch(RESTAURANT, id);
    }
};

export default RestaurantService;