<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <h1 class="text-h5 font-wight-bold">ผลการประเมิน</h1>
            <v-card class="pa-2">
                <center>
                    <nuxt-link to="/Evaluatee/score_member"><v-btn color="green" class="pa-2" size="small">ผลการประเมินของผู้รับการประเมินผล </v-btn></nuxt-link>&nbsp;&nbsp;
                <nuxt-link to="/Evaluatee/score_member"><v-btn color="blue" class="pa-2" size="small">ผลการประเมินของกรรมการประเมินผล </v-btn></nuxt-link>
                </center>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>