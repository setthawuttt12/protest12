<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if=" user.status_eva === 3 || user.status_eva === 2">
                    <h1 class="text-h5 font-wight-bold">ผลสรุปการประเมินของกรรมการประเมิน</h1>
                    <v-card class="mt-3 pa-3" :elevation="5" rounded>
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมิน : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic" class="">
                        <v-col cols="12">
                            <h1 class="text-h5 font-wight-bold">{{ Number(t) + 1 }} {{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="bg-grey border pa-1" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">ประธาน</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">กรรมการ</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">เลขา</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.name_indicate }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.detail_indicate || '-' }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.point_indicate }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.point_indicate*4 }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ scores[indicate.id_indicate]?.a ?? 'รอประธานประเมิน' }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ scores[indicate.id_indicate]?.b ?? 'รอกรรมการประเมิน' }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ scores[indicate.id_indicate]?.c ?? 'รอเลขาประเมิน' }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ (((scores[indicate.id_indicate]?.a ?? 0)+(scores[indicate.id_indicate]?.b ?? 0)+(scores[indicate.id_indicate]?.c ?? 0))/3).toFixed(2) }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                        
                    </v-row>
                    <div class="mt-3 text-center">
                        <v-card color="success" class="text-end pa-3" type="submit">คะแนนนรวมสุทธิ : {{ ((user.total_commit || 0)/3).toFixed(2) }} คะแนน</v-card>
                    </div>
                    <div class="mt-4">
                        <v-card class="pa-2">
                            <h3>ข้อเสนอแนะของกรรมการ</h3>
                            <v-row>
                                <v-col cols="12" md="12" v-for="(commit,c) in commits" :key="commit.id_commit">
                                    {{ c+1 }}.{{ commit.level_commit }}: {{ commit.detail_commit || 'รอการประเมิน' }}
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" type="warning">ยังไม่ได้ประเมินตนเอง</v-alert>
                <v-alert v-else type="error">ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { commit, staff } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])
const scores = ref<any>([]) 
const commits = ref<any>([])

const id_eva = useRoute().params.id_eva

const fecth = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/score_commit/user/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fecthTopics = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/score_commit/topic/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fetchCommits = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/score_commit/commit/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        commits.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fetchScores = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/score_commit/scores/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        scores.value = res.data.scores
    } catch (error) {
        console.error('Error Get user',error)
    }
}
  




onMounted(async()=>{
    await Promise.all([fecth(),fecthTopics(),fetchScores(),fetchCommits()])
})


</script>

<style scoped>

</style>