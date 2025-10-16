<script setup lang="ts">
import { onMounted, ref } from "vue";
import TextInput from "./form/TextInput.vue";
import { computed } from "@vue/reactivity";
import { supabase } from "../lib/supabaseClient";
import DropdownInput from "./form/DropdownInput.vue";
import SideBar from "./SideBar.vue";
import PieChart from "./PieChart.vue";
import RoomAllocation from "./RoomAllocation.vue";

const currentChurch = ref<string>("YFC");
const roleFilter = ref<"All" | "Leader" | "Student">();
const churchFilter = ref<string>();
const groupFilter = ref<string>();

const showFilters = ref<boolean>(true);
const userSelected = ref<boolean>(false);
const selectedUser = ref<(typeof rows.value)[0]>();
const loggedIn = ref<boolean>(false);
const adminPrivileges = ref<boolean>(false);
const inputUsername = ref<string>();
const inputPassword = ref<string>();
const rows = ref([
  {
    id: "",
    created_at: "",
    full_name: "",
    gender: "",
    date_of_birth: "",
    age: "",
    role: "",
    nationality: "",
    id_number: "",
    parent_email: "",
    email: "",
    phone_number: "",
    emergency_name: "",
    emergency_number: "",
    church_name: "",
    church_code: "",
    youth_leader: "",
    youth_number: "",
    leader_email: "",
    shirt_size: "",
    graduating: "",
    launch_conf: "",
    swimming: "",
    allergies: false,
    allergies_info: "",
    medication: false,
    medication_info: "",
    eyu_cap: "",
    bw_25_shirt: "",
    bw_25_shirt_size: "",
    online_payment: "",
    acknowledgement: "",
    paid: false,
    checked_in: false,
    group: "",
    tower: "",
    room: "",
  },
]);

const searchText = ref<string>("");
const church_names = ref<any>();
const churches = ref<any>();
const leaders = ref<Number>(0);
const students = ref<Number>(0);
const checkedLeaders = ref<Number>(0);
const checkedStudents = ref<Number>(0);

const loading = ref<boolean>(false);
const selectedOption = ref<number>(0);
const helpGuide = ref<boolean>(false);
const showSidebar = ref<boolean>(false);

const filteredRows = computed(() => {
  return rows.value.filter((row) => {
    if (
      churchFilter.value &&
      churchFilter.value.toLowerCase() != "(all churches)" &&
      churchFilter.value.toLowerCase() != row.church_name.toLowerCase()
    )
      return false;
    if (
      roleFilter.value &&
      roleFilter.value.toLowerCase() != "all" &&
      (roleFilter.value.toLowerCase() == "leader"
        ? row.role != "leader"
        : row.role == "leader")
    )
      return false;
    if (
      groupFilter.value &&
      groupFilter.value.toLowerCase() != "all" &&
      groupFilter.value.toLowerCase() != row.group.toLowerCase()
    )
      return false;
    return row.full_name
      .toLowerCase()
      .startsWith(searchText.value.toLowerCase());
  });
});

async function adminLogin() {
  loading.value = true;
  if (!inputPassword.value || !inputUsername.value) {
    loading.value = false;
    return; //do error text using :required
  }

  let { data, error } = await supabase.auth.signInWithPassword({
    email: inputUsername.value,
    password: inputPassword.value,
  });

  if (error || !data) {
    // try again
    loading.value = false;
    return;
  }

  adminPrivileges.value = true;
  checkLogIn();
}

async function checkLogIn() {
  console.log(rows.value);
  if (rows.value.length <= 1) helpGuide.value = true;

  loading.value = true;
  let { data, error } = await supabase
    .from("final-registrations-25")
    .select("*")
    .order("created_at");

  if (error) console.log(error);
  if (data) rows.value = data;

  const counts: Record<
    string,
    { signups: number; paidSignups: number; nonPaying: number }
  > = {};

  rows.value.forEach((row) => {
    if (row["church_name"]) {
      if (counts[row["church_name"].toString()])
        counts[row["church_name"].toString()] = {
          signups: counts[row["church_name"].toString()]["signups"] + 1,
          paidSignups:
            counts[row["church_name"].toString()]["paidSignups"] +
            (row["paid"] ? 1 : 0),
          nonPaying:
            counts[row["church_name"].toString()]["nonPaying"] +
            (!row["online_payment"] ? 1 : 0),
        };
      else
        counts[row["church_name"].toString()] = {
          signups: 1,
          paidSignups: row["paid"] ? 1 : 0,
          nonPaying: row["online_payment"] ? 0 : 1,
        };
    }
    if (counts["(All Churches)"])
      counts["(All Churches)"] = {
        signups: counts["(All Churches)"]["signups"] + 1,
        paidSignups:
          counts["(All Churches)"]["paidSignups"] + (row["paid"] ? 1 : 0),
        nonPaying:
          counts["(All Churches)"]["nonPaying"] +
          (!row["online_payment"] ? 1 : 0),
      };
    else
      counts["(All Churches)"] = {
        signups: 1,
        paidSignups: row["paid"] ? 1 : 0,
        nonPaying: !row["online_payment"] ? 1 : 0,
      };
  });

  church_names.value = Object.entries(counts).map(([name, info]) => ({
    name,
    info,
  }));

  churches.value = church_names.value.map((item: any) => item.name).sort();
  const index = churches.value.indexOf("(All Churches)");
  if (index > -1) {
    const [allEl] = churches.value.splice(index, 1);
    churches.value.unshift(allEl);
  }

  rows.value.sort((a, b) => {
    return a.full_name.localeCompare(b.full_name);
  });

  leaders.value = rows.value.filter(
    (row) => row.role.toLowerCase() == "leader"
  ).length;
  students.value = rows.value.filter(
    (row) => row.role.toLowerCase() != "leader"
  ).length;
  checkedLeaders.value = rows.value.filter(
    (row) => row.role.toLowerCase() == "leader" && row.checked_in
  ).length;
  checkedStudents.value = rows.value.filter(
    (row) => row.role.toLowerCase() != "leader" && row.checked_in
  ).length;

  loggedIn.value = true;
  loading.value = false;
  console.log(rows.value);
}

function chooseUser(user: typeof selectedUser.value) {
  selectedUser.value = user;
  userSelected.value = true;

  const el = document.getElementById("namelist");
  el?.classList.add("overflow-hidden", "fixed");
}

function unchooseUser() {
  userSelected.value = false;

  const el = document.getElementById("namelist");
  el?.classList.remove("overflow-hidden", "fixed");
}

async function checkInParticipant(id: string) {
  if (!adminPrivileges || id == "") return;

  loading.value = true;

  const { data, error } = await supabase
    .from("final-registrations-25")
    .update({ checked_in: true })
    .eq("id", id)
    .select();

  if (error) console.log(error);
  if (data) console.log(data);

  const rowIndex = rows.value.findIndex((row) => row.id == id);
  rows.value[rowIndex].checked_in = true;
  checkLogIn();
}

function hoverRecord(id: any) {
  const el = document.getElementById(id);

  if (el) {
    el.classList.remove("bg-white");
    el.classList.add("bg-red-800", "text-white");
  }
}

function unhoverRecord(id: any) {
  const el = document.getElementById(id);

  if (el) {
    el.classList.add("bg-white");
    el.classList.remove("bg-red-800", "text-white");
  }
}

async function changeSection(option: number) {
  selectedOption.value = option;
}

function toggleHelpGuide() {
  helpGuide.value = !helpGuide.value;
}

onMounted(() => {});
</script>

<template>
  <div
    class="flex flex-col gap-4 items-center min-h-dvh w-full bg-neutral-200"
    :class="loggedIn ? 'justify-start' : 'justify-center'"
  >
    <div
      v-if="!loggedIn"
      class="w-1/2 min-w-72 flex flex-col justify-start items-center gap-4 rounded-lg border py-4 bg-white"
    >
      <h1 class="text-2xl font-semibold">Big Weekend Admin Panel</h1>
      <div class="h-[1px] bg-black w-full"></div>
      <p>(for CORE leaders)</p>
      <div
        class="flex flex-col w-64 xl:w-full justify-center items-center gap-4"
      >
        <TextInput
          id="email"
          v-model="inputUsername"
          :title="'Email'"
          :placeholder="'someone@example.com'"
        />
        <TextInput
          id="password"
          v-model="inputPassword"
          :title="'Password'"
          :placeholder="'********'"
          :inputType="'password'"
        />
        <button
          @click="adminLogin"
          :class="loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
          class="min-w-64 sm:w-1/3 hover:scale-105 transition-all px-4 pb-2 pt-3 rounded-lg bg-secondary text-white"
        >
          LOG IN AS ADMIN
        </button>
      </div>
      <div class="h-[1px] bg-black w-full"></div>
      <p>(for REGULAR leaders)</p>
      <button
        @click="checkLogIn"
        :class="loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
        class="min-w-64 sm:w-1/3 hover:scale-105 transition-all m-auto w-fit px-4 pb-2 pt-3 rounded-lg bg-secondary text-white"
      >
        LOG IN AS GUEST
      </button>
    </div>

    <SideBar
      v-if="loggedIn"
      :loggedIn="loggedIn"
      :selectedOption="selectedOption"
      :adminPrivileges="adminPrivileges"
      :showSidebar="showSidebar"
      @changeSection="changeSection"
      @closeSidebar="showSidebar = !showSidebar"
    />

    <div
      class="flex flex-col items-start w-full md:w-10/12 lg:w-8/12 gap-4 p-2"
      v-if="loggedIn && selectedOption == 0"
    >
      <div class="w-full rounded-lg p-4 bg-neutral-600 text-white">
        <div class="py-2 w-full flex justify-between items-center">
          <h1 class="text-xl font-bold">Admin Panel</h1>
          <ion-icon
            class="cursor-pointer h-4 w-4 p-1 hover:bg-primary rounded border border-white"
            @click="showFilters = !showFilters"
            v-if="showFilters"
            name="caret-up"
          ></ion-icon>
          <ion-icon
            class="cursor-pointer h-4 w-4 p-1 hover:bg-primary rounded border border-white"
            @click="showFilters = !showFilters"
            v-if="!showFilters"
            name="caret-down"
          ></ion-icon>
        </div>
        <div
          v-if="showFilters"
          class="w-full flex flex-col sm:flex-row gap-2 mb-4"
        >
          <TextInput
            v-model="searchText"
            :extraCss="'border-primary bg-white text-black'"
            :title="'Search by Name'"
            :placeholder="'Search...'"
          ></TextInput>
          <DropdownInput
            v-model="roleFilter"
            :extraCss="'border-primary bg-white text-black'"
            :title="'Choose Role'"
            :placeholder="'All'"
            :options="['All', 'Leader', 'Student']"
          ></DropdownInput>
          <DropdownInput
            v-model="churchFilter"
            :extraCss="'border-primary bg-white text-black'"
            :title="'Choose Church'"
            :placeholder="'Choose Church'"
            :options="churches"
            :disabled="currentChurch != 'YFC'"
          ></DropdownInput>
          <DropdownInput
            v-model="groupFilter"
            :extraCss="'border-primary bg-white text-black'"
            :title="'Choose Group'"
            :placeholder="'Choose Group'"
            :options="[
              'All',
              'Blue 1',
              'Blue 2',
              'Blue 3',
              'Blue 4',
              'Gold 1',
              'Gold 2',
              'Gold 3',
              'Gold 4',
              'Green 1',
              'Green 2',
              'Green 3',
              'Green 4',
              'Orange 1',
              'Orange 2',
              'Orange 3',
              'Orange 4',
              'Purple 1',
              'Purple 2',
              'Purple 3',
              'Purple 4',
              'Red 1',
              'Red 2',
              'Red 3',
              'Red 4',
              'Silver 1',
              'Silver 2',
              'Silver 3',
              'Silver 4',
            ]"
            :disabled="currentChurch != 'YFC'"
          ></DropdownInput>
        </div>
      </div>
      <!-- <div class="w-full h-[1px] bg-black"></div> -->
      <div class="w-full flex flex-wrap gap-2 justify-between items-center">
        <button
          @click="showSidebar = !showSidebar"
          class="lg:hidden block cursor-pointer p-2 bg-secondary text-white font-semibold rounded"
        >
          SHOW SIDEBAR
        </button>
        <ion-icon
          @click="toggleHelpGuide"
          name="help"
          class="h-6 w-6 border rounded-full cursor-pointer hover:text-secondary ml-25"
        ></ion-icon>
        <p>
          Total Participants Shown:
          <span class="font-semibold">{{ filteredRows.length }}</span>
        </p>
      </div>
      <div class="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 h-full">
        <div v-for="record in filteredRows">
          <div
            class="bg-white border-2 hover:shadow-xl border-primary hover:border-secondary rounded flex flex-col items-start gap-2 p-2 cursor-pointer transition-all h-full"
            @mouseenter="hoverRecord(record.id)"
            @mouseleave="unhoverRecord(record.id)"
            @click="chooseUser(record)"
          >
            <div
              class="flex lg:flex-row flex-col gap-2 w-full h-full items-stretch"
            >
              <div
                class="text-left flex flex-col items-start justify-center grow"
              >
                <p class="capitalize font-bold">
                  {{
                    record.full_name
                      .toLowerCase()
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")
                  }}
                </p>
              </div>
              <p
                class="w-fit rounded p-1 pt-2 text-black border-black bg-white border inline-flex items-center"
              >
                <img
                  class="h-8 w-8 inline-block mr-2"
                  :src="'/swimming.png'"
                /><span class="capitalize">{{ record.swimming }}</span>
              </p>
              <div
                class="rounded p-1 pt-2 font-semibold text-white flex items-center justify-center"
                :class="
                  record.gender === 'female' ? 'bg-pink-700' : 'bg-blue-700'
                "
              >
                <span
                  >{{ record.age }}
                  {{ record.gender.charAt(0).toUpperCase() }}</span
                >
              </div>
              <div
                class="rounded p-1 pt-2 font-semibold text-white bg-red-900 flex items-center justify-center"
                v-if="record.role === 'leader'"
              >
                LEADER
              </div>
            </div>
            <div class="w-full flex flex-wrap justify-between items-center">
              <div class="flex gap-4">
                <a
                  :href="`tel:${record.phone_number}`"
                  class="underline font-semibold text-blue-700"
                >
                  <ion-icon name="call"></ion-icon>
                  Call
                </a>
                <a
                  :href="`mailto:${record.email}`"
                  class="underline font-semibold text-blue-700 wrap-anywhere"
                >
                  <ion-icon name="mail"></ion-icon>
                  Email
                </a>
              </div>
              <p
                class="capitalize p-2 rounded text-white font-semibold"
                :class="record.checked_in ? 'bg-green-600' : 'bg-red-600'"
              >
                {{ record.checked_in ? "Checked In" : "Not Checked In" }}
              </p>
            </div>
            <div class="w-full h-1"></div>
            <div
              class="w-full flex lg:flex-row flex-col justify-between items-end gap-2"
            >
              <div class="w-full text-left">
                <p>
                  Church:
                  <span class="font-semibold">{{ record.church_name }} </span>
                </p>
                <p>
                  Medication:
                  <span class="font-semibold"
                    >{{ record.medication ? record.medication_info : "None" }}
                  </span>
                </p>
                <p>
                  Allergies:
                  <span class="font-semibold"
                    >{{ record.allergies ? record.allergies_info : "None" }}
                  </span>
                </p>
                <p>
                  Emergency Contact:
                  <span class="font-semibold"
                    >{{ record.emergency_name }}
                  </span>
                </p>
                <p>
                  Emergency Number:
                  <a
                    :href="`tel:${record.emergency_number}`"
                    class="underline font-semibold text-blue-700"
                  >
                    <ion-icon name="call"></ion-icon>
                    Call
                  </a>
                </p>
              </div>
              <ion-icon
                :id="record.id"
                class="h-6 w-6 py-1 lg:px-1 not-lg:w-full box-border text-black rounded border border-black transition-all"
                name="caret-forward-outline"
              ></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full md:w-10/12 lg:w-8/12 p-2"
      v-if="loggedIn && adminPrivileges && selectedOption == 1"
    >
      <div class="w-full rounded-lg p-4 bg-neutral-600 text-white">
        <h1 class="w-full text-left text-xl font-bold">Dashboard</h1>
      </div>
      <div class="w-full flex flex-wrap">
        <div class="grow w-1/2 min-w-60 p-2">
          <div
            class="bg-white flex flex-col justify-start items-center rounded border w-full p-2"
          >
            <PieChart
              :name="'Leaders'"
              :values="`conic-gradient(#8C343A 0% ${
                (checkedLeaders.valueOf() * 100) / leaders.valueOf()
              }%, #B69B72 ${
                (checkedLeaders.valueOf() * 100) / leaders.valueOf()
              }% 100%)`"
              :labels="[
                `Checked In (${checkedLeaders})`,
                `Not Checked In (${
                  leaders.valueOf() - checkedLeaders.valueOf()
                })`,
              ]"
            />
          </div>
        </div>
        <div class="grow w-1/2 min-w-60 p-2">
          <div
            class="bg-white flex flex-col justify-start items-center rounded border w-full p-2"
          >
            <PieChart
              :name="'Students'"
              :values="`conic-gradient(#8C343A 0% ${
                (checkedStudents.valueOf() * 100) / leaders.valueOf()
              }%, #B69B72 ${
                (checkedStudents.valueOf() * 100) / students.valueOf()
              }% 100%)`"
              :labels="[
                `Checked In (${checkedStudents})`,
                `Not Checked In (${
                  students.valueOf() - checkedStudents.valueOf()
                })`,
              ]"
            />
          </div>
        </div>
      </div>
      <RoomAllocation :rows="rows" @click-user="chooseUser" />
    </div>

    <div
      class="w-full fixed h-dvh flex justify-center sm:justify-end backdrop-blur-lg backdrop-brightness-75 transition-all overflow-hidden"
      :class="userSelected ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <div
        class="absolute not-sm:top-10 not-sm:pb-14 z-30 rounded bg-white sm:w-1/3 min-w-72 h-full p-4 flex flex-col gap-2 transition-all"
        :class="
          userSelected
            ? 'sm:translate-x-0 not-sm:translate-y-0'
            : 'sm:translate-x-full not-sm:translate-y-full'
        "
      >
        <div class="flex items-center gap-2">
          <button
            @click="unchooseUser"
            class="pt-2 hover:scale-110 transition-all cursor-pointer"
          >
            <ion-icon name="close"></ion-icon>
          </button>
          <p>User Details</p>
        </div>
        <div class="w-full flex flex-col gap-2 overflow-y-scroll">
          <p class="text-2xl m-0 text-left font-semibold">
            {{ selectedUser?.full_name }}
          </p>
          <p class="text-left">{{ selectedUser?.church_name }}</p>
          <p class="rounded p-4 pt-5 text-black border-black bg-white border">
            <img
              class="h-8 w-8 inline-block mr-2"
              :src="'/swimming.png'"
            /><span class="capitalize">{{ selectedUser?.swimming }}</span>
          </p>
          <div
            class="rounded p-4 pt-5 font-semibold text-white flex items-center justify-center"
            :class="
              selectedUser?.gender === 'female' ? 'bg-pink-700' : 'bg-blue-700'
            "
          >
            <span
              >{{ selectedUser?.age }}
              {{ selectedUser?.gender.charAt(0).toUpperCase() }}</span
            >
          </div>
          <div
            class="capitalize rounded p-4 pt-5 font-semibold text-white flex items-center justify-center"
            :class="
              selectedUser?.role === 'leader' ? 'bg-secondary' : 'bg-primary'
            "
          >
            {{ selectedUser?.role }}
          </div>
          <div
            class="capitalize rounded p-4 pt-5 font-semibold text-white flex items-center justify-center"
            :class="
              selectedUser?.group == 'CORE' || selectedUser?.group == 'GUEST'
                ? 'bg-black'
                : `bg-${selectedUser?.group.split(' ')[0].toLowerCase()}-900`
            "
          >
            {{ selectedUser?.group }}
          </div>
          <div
            class="capitalize rounded p-4 pt-5 font-semibold text-white bg-black flex items-center justify-center"
          >
            Tower {{ selectedUser?.tower }}, Room {{ selectedUser?.room }}
          </div>
          <div class="w-full h-0.5 my-4 bg-black rounded"></div>
          <p class="text-left text-xl font-semibold">Personal Information</p>
          <p class="text-left">
            DOB:
            <span class="font-semibold">{{ selectedUser?.date_of_birth }}</span>
          </p>
          <p class="text-left">
            Nationality:
            <span class="font-semibold capitalize">{{
              selectedUser?.nationality
            }}</span>
          </p>
          <p class="text-left w-fit bg-yellow-300 font-semibold">
            ID Number:
            <span
              :class="adminPrivileges ? '' : 'blur-xs'"
              class="font-semibold"
              >{{ selectedUser?.id_number }}</span
            >
          </p>
          <p class="text-left">
            Email:
            <a
              :href="`mailto:${selectedUser?.email}`"
              class="font-semibold underline text-blue-600"
              >{{ selectedUser?.email }}</a
            >
          </p>
          <p class="text-left">
            Number:
            <a
              :href="`tel:${selectedUser?.phone_number}`"
              class="font-semibold underline text-blue-600"
              >{{ selectedUser?.phone_number }}</a
            >
          </p>
          <p class="text-left">
            Emergency Contact:
            <span class="font-semibold">{{
              selectedUser?.emergency_name
            }}</span>
          </p>
          <p class="text-left">
            Emergency Number:
            <span class="font-semibold">{{
              selectedUser?.emergency_number
            }}</span>
          </p>
          <p class="text-left">
            Parent Email:
            <a
              :href="`mailto:${selectedUser?.parent_email}`"
              class="font-semibold underline text-blue-600"
              >{{ selectedUser?.parent_email }}</a
            >
          </p>
          <p class="text-left text-xl mt-4 font-semibold">Church Information</p>
          <p class="text-left">
            Youth Leader:
            <span class="font-semibold">{{ selectedUser?.youth_leader }}</span>
          </p>
          <p class="text-left">
            Youth Leader's Email:
            <a
              :href="`mailto:${selectedUser?.leader_email}`"
              class="font-semibold underline text-blue-600"
              >{{ selectedUser?.leader_email }}</a
            >
          </p>
          <p class="text-left">
            Youth Leader's Number:
            <a
              :href="`tel:${selectedUser?.youth_number}`"
              class="font-semibold underline text-blue-600"
              >{{ selectedUser?.youth_number }}</a
            >
          </p>
          <p class="text-left text-xl mt-4 font-semibold">
            Additional Information
          </p>
          <p class="text-left w-fit bg-yellow-300 font-semibold">
            Shirt Size:
            <span class="font-semibold">{{ selectedUser?.shirt_size }}</span>
          </p>
          <p class="text-left w-fit bg-yellow-300 font-semibold">
            Swimming:
            <span class="font-semibold">{{ selectedUser?.swimming }}</span>
          </p>
          <p
            class="text-left"
            :class="
              selectedUser?.allergies ? 'w-fit bg-yellow-300 font-semibold' : ''
            "
          >
            Allergies:
            <span class="font-semibold">{{
              selectedUser?.allergies_info
            }}</span>
          </p>
          <p
            class="text-left"
            :class="
              selectedUser?.medication
                ? 'w-fit bg-yellow-300 font-semibold'
                : ''
            "
          >
            Medication:
            <span class="font-semibold">{{
              selectedUser?.medication_info
            }}</span>
          </p>
          <p class="text-left text-xl mt-4 font-semibold">Seniors Conference</p>
          <p class="text-left">
            Graduating:
            <span class="font-semibold">{{ selectedUser?.graduating }}</span>
          </p>
          <p class="text-left">
            Interest:
            <span class="font-semibold">{{
              selectedUser?.launch_conf ?? "No"
            }}</span>
          </p>
          <p class="text-left text-xl mt-4 font-semibold">Merchandise</p>
          <p
            class="text-left"
            :class="
              selectedUser?.eyu_cap ? 'w-fit bg-yellow-300 font-semibold' : ''
            "
          >
            EYU Cap:
            <span class="font-semibold">{{
              selectedUser?.eyu_cap ?? "No"
            }}</span>
          </p>
          <p
            class="text-left"
            :class="
              selectedUser?.bw_25_shirt
                ? 'w-fit bg-yellow-300 font-semibold'
                : ''
            "
          >
            BW25 Sweatshirt:
            <span class="font-semibold">{{
              selectedUser?.bw_25_shirt ?? "No"
            }}</span>
          </p>
          <p
            class="text-left"
            :class="
              selectedUser?.bw_25_shirt
                ? 'w-fit bg-yellow-300 font-semibold'
                : ''
            "
          >
            BW25 Sweatshirt Size:
            <span class="font-semibold">{{
              selectedUser?.bw_25_shirt_size ?? "No"
            }}</span>
          </p>
          <button
            @click="checkInParticipant(selectedUser?.id ?? '')"
            v-if="!selectedUser?.checked_in && adminPrivileges"
            class="cursor-pointer transition-all rounded w-full mt-4 text-white font-semibold text-xl p-2 bg-primary hover:bg-secondary"
          >
            Mark As Checked In
          </button>
          <p
            v-else-if="!selectedUser?.checked_in && !adminPrivileges"
            class="cursor-not-allowed rounded w-full mt-4 text-white font-semibold text-xl p-2 bg-primary opacity-50"
          >
            Requires Admin
          </p>
          <p
            v-else
            class="cursor-not-allowed rounded w-full mt-4 text-white font-semibold text-xl p-2 bg-secondary opacity-50"
          >
            Checked In
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="loading"
      class="fixed flex justify-center items-center top-0 z-50 backdrop-blur-xs bg-background-layer h-dvh w-dvw"
    >
      <p class="z-50 text-white text-xl font-semibold p-4 rounded bg-primary">
        Loading...
      </p>
    </div>

    <div
      v-if="helpGuide"
      class="w-dvw h-dvh fixed top-0 backdrop-blur-lg bg-background-layer flex justify-center items-center"
    >
      <div
        class="flex flex-col items-start rounded p-4 bg-white border min-w-72 overflow-auto max-w-1/2"
      >
        <p class="text-2xl font-semibold w-full">Help Guide</p>
        <p class="w-full">
          Hopefully this isn't that hard to use, but here's some simple
          intructions in case (this can be opened again using the
          <ion-icon name="help" class="h-4 w-4 border rounded-full"></ion-icon>
          button):
        </p>
        <div class="h-6"></div>
        <p class="text-left">
          - <span class="font-semibold">Namelist</span> shows you important info
          of every participant you may need to contact a student or a fellow
          leader.
        </p>
        <p class="text-left">
          -
          <span class="font-semibold">THERE IS PERSONAL INFORMATION HERE.</span>
          Do not share this with other students. Only access is allowed to
          leaders. This is essential and obvious.
        </p>
        <p class="text-left">
          - You can
          <span class="font-semibold"
            >search, filter by role, filter by church</span
          >
          - use this to filter according to your needs.
        </p>
        <p class="text-left">
          - If a student is in trouble, make sure to check for their
          <span class="font-semibold">medication and allergy</span> information.
        </p>
        <p class="text-left">
          - Clicking on a student opens a bigger view for every necessary
          detail.
        </p>
        <div class="h-6"></div>
        <p class="w-full">
          Be respectful and responsible with this information. You are a leader
          at Big Weekend and we're all here to make sure the leaders of tomorrow
          have a great time, and that only happens with your support and help
          (and discretion with sensitive information lol)
        </p>
        <div class="h-6"></div>
        <button
          @click="toggleHelpGuide"
          class="cursor-pointer rounded bg-secondary text-white font-semibold p-2 m-auto"
        >
          GOT IT
        </button>
      </div>
    </div>

    <span
      class="hidden bg-blue-900 bg-red-900 bg-gold-900 bg-silver-900 bg-purple-900 bg-green-900 bg-orange-900"
    ></span>
  </div>
</template>

<style scoped lang="scss">
.bg-gold-900 {
  background-color: rgb(124, 102, 30);
}

.bg-silver-900 {
  background-color: rgb(116, 116, 116);
}

.bg-orange-900 {
  background-color: rgb(168, 92, 4);
}
</style>
