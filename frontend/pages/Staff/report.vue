<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">รายงาน</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table class="table mt-3">
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">รายงาน</th>
                                    <th class="text-center border">รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center border">1</td>
                                    <td class="text-center border">รายงาน</td>
                                    <td class="text-center border">
                                        <center>
                                            <nuxt-link to="/Staff/Re_eva"><v-btn class="ma-3 text-center text-white" color="info" size="small">รายละเอียด</v-btn></nuxt-link>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';


</script>

<style scoped>

</style>