/**
 * Created by Liu.Jun on 2020/4/30 17:04.
 */

// uiSchema imgItem
export default function ({
    field = 'LinkImgField',
    width = 580,
    height = 580,
} = { }) {
    return {
        'ui:field': field,
        // 'ui:description': `${width}px,${height}xJPGPNG  2 MB<br>`,
        'ui:options': {
            type: ['jpg', 'jpeg', 'png'],
            size: 2048,
            width,
            height,
            limit: 1
        }
    };
}
