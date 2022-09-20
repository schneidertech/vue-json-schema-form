/**
 * Created by Liu.Jun on 2020/4/30 17:04.
 */

// errorSchema imgItem
export default function () {
    return {
        imgUrl: {
            'err:format': '',
            'err:required': ''
        },
        imgLink: {
            'err:format': '',
            'err:required': ''
        }
    };
}
