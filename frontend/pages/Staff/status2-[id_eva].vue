<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">สถานะการประเมินกรรมการประเมินผล</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="ค้นหา" v-model="search" prepend-inner-icon="mdi-magnify" class="mt-3"></v-text-field>
                        <v-table class="table mt-3">
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">กรรมการประเมิน</th>
                                    <th class="text-center border">สถานะการประเมิน</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_commit">
                                    <td class="text-center border">{{ index+1 }}</td>
                                    <td class="text-center border">{{ items.fname }} {{ items.lname }}</td>
                                    <td class="text-center border">
                                        <v-btn class="ma-3 text-center text-white" :color="bg(items.status_commit)" size="small">{{ items.status_commit === 'n' ? 'ยังไม่ได้ประเมิน': 'ประเมินเสร็จสิ้น' }}</v-btn>
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
const dataResult = ref([])
const eva = ref([])
const round =ref([])
const search = ref('')
const form = ref(
    {
        id_eva:null,
        id_member:'',
        id_sys:'',
        day_eva:''
    }
)
const reset = ()=>{
    form.value = {
        id_eva:null,
        id_member:'',
        id_sys:'',
        day_eva:''
    }
}
function validateForm(){
    const f = form.value
    error.value = {}

    if(!f.id_member)error.value.id_member = 'กรุณาเลือกผู้รับการประเมินผล'
    if(!f.id_sys)error.value.id_sys = 'กรุณาเลือกรอบการประเมิน'
    if(!f.day_eva)error.value.day_eva = 'กรุณากรอกวันที่ออกแบบประเมิน'

    return Object.keys(error.value).length === 0

}
const token = import.meta.client ? localStorage.getItem('token'):null
const id_eva = useRoute().params.id_eva
const bg =(status_commit:string)=>{
    if(status_commit === 'n')return 'error'
    else if(status_commit === 'y')return 'success'
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/status/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data
        
        
    } catch (error) {
        console.error("error Get status");
        
    }
}

const result = computed(()=>{

    if(!search.value)return dataResult.value
    const s = search.value.toLowerCase()

    return dataResult.value.filter((items:any)=>{
        return(
            items.fname?.toLowerCase().includes(s) ||
            items.lname?.toLowerCase().includes(s)
        )

    })

})

const go = (id_eva:number)=>{
    navigateTo({path:`/Staff/status2-${id_eva}`})
}

onMounted(fetch)

</script>

<style scoped>

</style>