<template>
    <div style="text-align: right;">
        <div style="margin: -10px 0 10px; text-align: left;color: #999;">
            <p> Orz . ...</p>
        </div>
        <el-input
            v-model="importStr"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
            placeholder=""
        >
        </el-input>
        <p style="margin-top: 20px;">
            <el-button
                type="primary"
                @click="$emit('onImport', importStr)"
            >

            </el-button>
        </p>
    </div>
</template>

<script>

export default {
    name: 'ImportSchemaView',
    data() {
        return {
            importStr: ''
        };
    }
};
</script>
