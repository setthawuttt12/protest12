<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">เอกสารหรือคู่มือการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <br>
                        <v-form @submit.prevent="saveMember">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อเอกสาร" v-model="name_doc" :error-messages="error.name_doc" prepend-inner-icon="mdi-file-edit"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-file-input label="เอกสาร" v-model="file" :error-messages="error.file" accept=".pdf" hint="รองรับเฉพาะไฟล์ PDF ขนาดไม่เกิน 10MB" persistent-hint></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-3" color="primary" type="submit">บันทึก</v-btn>
                                        <v-btn class="text-center ma-3" color="error" type="reset">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-text-field label="ค้นหา" v-model="search" prepend-inner-icon="mdi-magnify" class="mt-3"></v-text-field>
                        <v-table class="table mt-3">
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">ชื่อเอกสาร</th>
                                    <th class="text-center border">วันที่ออกเอกสาร</th>
                                    <th class="text-center border">เอกสาร</th>
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
                                    <td class="text-center border">
                                        <center>
                                            <v-btn class="ma-3 text-center text-white" color="error" size="small" @click="del(items.id_doc)">ลบ</v-btn>
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

const saveMember = async()=>{
    if(!name_doc.value || !file.value)return alert('กรอกข้อมูลให้ครบถ้วน')
    const maxSize = 10 * 1024 *1024
    if(file.value.size > maxSize){
        alert('ไฟล์มีขนาดใหญ่เกิน 10MB')
    }
    const formData = new FormData
    formData.append('name_doc',name_doc.value)
    formData.append('file',file.value)

    try {
    
        await axios.post(`${staff}/doc/save`,formData,{headers:{Authorization:`Bearer ${token}`}})
        name_doc.value = ''
        file.value = null
        await fetch()
        alert('ทำรายการสำเร็จ')
    } catch (error) {
        console.error("Error save doc",error);
        
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/doc/show`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data
        
    } catch (error) {
        console.error("error Get doc");
        
    }
}


const del = async(id_doc:number)=>{
    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        
        await axios.delete(`${staff}/doc/delete/${id_doc}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()

    } catch (error) {
        console.error("Error delete doc",error);
        
    }
}

const result = computed(()=>{

    if(!search.value)return dataResult.value
    const s = search.value.toLowerCase()

    return dataResult.value.filter((items:any)=>{
        return(
           items.name_doc?.toLowerCase().includes(s) 
        )
        
    })

})

const view = (filename:string)=>{

    const url = new URL(`/uploads/document/${filename}`,api).href
    window.open(url,'_blank')

}

onMounted(fetch)

</script>

<style scoped>

</style>