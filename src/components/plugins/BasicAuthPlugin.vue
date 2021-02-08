<template>
<div>
    <Modal @cancel="cancelClicked" title="Basic Authentication Plugin" :fields="fields" v-if="services" />
{{services}}
</div>
</template>
<script>
import Modal from "../Modal";
export default {
    components: {
        Modal
    },
    methods: {
        cancelClicked() {
            this.$emit('cancel');
        }
    },
    data: () => ({
        fields: [
            {
                type: "select",
                label: "Service",
                value: undefined,
                number: false,
            },
            {
                type: "select",
                label: "Route",
                value: undefined,
                number: false,
            },
            {
                type: "switch",
                label: "Hide Credentials",
                value: false,
            },
            {
                type: "text-field",
                label: "Anonymous Consumer",
                value: undefined,
                number: false,
            },
        ]
    })
}
</script>