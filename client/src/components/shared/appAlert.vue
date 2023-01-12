<template>
    <div class="alert  text-center p-3" :class="alertBG">
        <slot name="content">

        </slot>
    </div>
</template>
<script>
export default {
    props: {
        alertType: {
            type: String
        }
    },
    computed: {
        alertBG() {
            return `alert-${this.alertType}`
        }
    }
}
</script>