<template>
    <Modal @cancel="cancelClicked" title="Session Plugin" :fields="fields" />
</template>
<script>
import Modal from "../Modal"
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
                type: "text-field",
                label: "Cookie Name",
                value: undefined,
                number: false,
            },
            {
                type: "text-field",
                label: "Cookie Timeout (seconds)",
                value: 3600,
                number: true,
            },
            {
                type: "text-field",
                label: "Cookie Idle Time (seconds)",
                value: undefined,
                number: true
            },
            {
                type: "text-field",
                label: "Cookie Renew (seconds)",
                value: 600,
                number: true,
            },
            {
                type: "text-field",
                label: "Cookie Path",
                value: "/",
                number: false,
            },
            {
                type: "select",
                label: "SameSite",
                items: ["Strict", "Lax", "None", "off"],
                value: "Strict",
            },
            {
                type: "switch",
                label: "Cookie Secure",
                value: true,
            },
            {
                type: "text-field",
                label: "Cookie Discard (seconds)",
                value: 10,
                number: true
            },
            {
                type: "select",
                label: "Storage",
                value: "cookie",
                items: ["cookie", "kong"]
            },
            {
                type: "select",
                label: "Logout Methods",
                value: ["POST", "DELETE"],
                multiple: true,
                items: ["POST", "DELETE", "GET"]
            },
            {
                type: "text-field",
                label: "Logout Query Argument",
                value: "session_logout",
                number: false,
            }
        ]
    })
}
</script>