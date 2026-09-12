<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">จัดการรอบการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <br>
                        <v-form @submit.prevent="saveMember">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="วันที่เปิดรอบการประเมิน" v-model="form.day_open" :error-messages="error.day_open" prepend-inner-icon="mdi-clock" type="date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="วันที่ปิดรอบการประเมิน" v-model="form.day_out" :error-messages="error.day_out" prepend-inner-icon="mdi-clock" type="date"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="รอบการประเมิน" v-model="form.round_sys" :error-messages="error.round_sys" type="number"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ปีการประเมิน" v-model="form.year_sys" :error-messages="error.year_sys" type="number"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-select label="สถานะรอบการประเมิน" v-model="form.status_sys" :error-messages="error.status_sys" :items="[{title:'เปิด',value:'y'},{title:'ปิด',value:'n'}]"></v-select>
                                </v-col>
                                
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-3" color="primary" type="submit">{{ form.id_sys ? 'อัปเดต':'บันทึก' }}</v-btn>
                                        <v-btn class="text-center ma-3" color="error" @click="reset()">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-table class="table mt-3">
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">วันที่เปิดรอบการประเมิน</th>
                                    <th class="text-center border">วันที่ปิดรอบการประเมิน</th>
                                    <th class="text-center border">รอบการประเมิน</th>
                                    <th class="text-center border">ปีการประเมิน</th>
                                    <th class="text-center border">สถานะรอบการประเมิน</th>
                                    <th class="text-center border">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_sys">
                                    <td class="text-center border">{{ index+1 }}</td>
                                    <td class="text-center border">{{ items.day_open }}</td>
                                    <td class="text-center border">{{ items.day_out }}</td>
                                    <td class="text-center border">{{ items.round_sys }}</td>
                                    <td class="text-center border">{{ items.year_sys }}</td>
                                    <td class="text-center border">{{ items.status_sys === 'y' ? 'เปิด':'ปิด' }}</td>
                                    <td class="text-center border">
                                        <center>
                                            <v-btn class="ma-3 text-center text-white" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>
                                            <v-btn class="ma-3 text-center text-white" color="error" size="small" @click="del(items.id_sys)">ลบ</v-btn>
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

const error = ref<Record<string,string>>({})
const result = ref([])
const topics = ref([])
const search = ref('')
const form = ref(
    {
        id_sys:null,
        day_open:'',
        day_out:'',
        round_sys:'',
        year_sys:'',
        status_sys:''
    }
)
const reset = ()=>{
    form.value = {
        id_sys:null,
        day_open:'',
        day_out:'',
        round_sys:'',
        year_sys:'',
        status_sys:''
    }
}
function validateForm(){
    const f = form.value
    error.value = {}

    if(!f.day_open)error.value.day_open = 'กรุณากรอกวันที่เปิดรอบการประเมิน'
    if(!f.day_out.trim())error.value.day_out = 'กรุณากรอกวันที่ปิดรอบการประเมิน'
    if(!f.round_sys.trim())error.value.round_sys = 'กรุณากรอกรอบการประเมิน'
    if(!f.year_sys)error.value.year_sys = 'กรุณากรอกปีการประเมิน'
    if(!f.status_sys)error.value.status_sys = 'กรุณาเลือกสถานะรอบการประเมิน'

    return Object.keys(error.value).length === 0

}
const token = import.meta.client ? localStorage.getItem('token'):null

const saveMember = async()=>{
    if(!validateForm())return
    const f = form.value
    try {
        
        f.id_sys 
        ? await axios.put(`${staff}/round/update/${f.id_sys}`,form.value,{headers:{Authorization:`Bearer ${token}`}})
        : await axios.post(`${staff}/round/save`,form.value,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await reset()
        await fetch()

    } catch (error) {
        console.error("Error round",error);
        
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/round/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        
    } catch (error) {
        console.error("error Get round");
        
    }
}

const edit = (items:any)=>{
    form.value = {...items}
}

const del = async(id_sys:number)=>{
    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        
        await axios.delete(`${staff}/round/delete/${id_sys}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        await reset()

    } catch (error) {
        console.error("Error delete round",error);
        
    }
}


onMounted(fetch)

</script>

<style scoped>

</style>