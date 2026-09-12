<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">คู่มือการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table class="table mt-3">
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">ชื่อเอกสาร</th>
                                    <th class="text-center border">วันที่เพิ่ม</th>
                                    <th class="text-center border">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_doc">
                                    <td class="text-center border">{{ index+1 }}</td>
                                    <td class="text-center border">{{ items.name_doc }}</td>
                                    <td class="text-center border">{{ items.day_doc }}</td>
                                    <td class="text-center border">
                                        <center>
                                            <v-btn class="ma-3 text-center text-white" color="info" size="small" @click="view(items.file)" prepend-icon="mdi-eye">เปิดดู</v-btn>
                                        </center>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center text-red" colspan="10" v-if="result.length === 0">ไม่พบข้อมูล</td>
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

const file = ref<File | null>(null)
const error = ref<Record<string,string>>({})
const dataResult = ref([])
const search = ref('')
const name_doc = ref('')

const token = import.meta.client ? localStorage.getItem('token'):null



const fetch = async()=>{
    try {
        
        const res = await axios.get(`${api}/docnoc`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        
    } catch (error) {
        console.error("error Get doc");
        
    }
}




const result = ref([])

const view = (filename:string)=>{

    const url = new URL(`/uploads/document/${filename}`,api).href
    window.open(url,'_blank')

}

onMounted(fetch)

</script>

<style scoped>

</style>