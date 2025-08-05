<script setup lang="ts">
import { ref } from "vue";
import Nav from "./Nav.vue";
import TextInput from "./form/TextInput.vue";
import DropdownInput from "./form/DropdownInput.vue";
import DateInput from "./form/DateInput.vue";
import CheckboxInput from "./form/CheckboxInput.vue";
import NumberInput from "./form/NumberInput.vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import Toaster from "./Toaster.vue";

const today = new Date();
const registrationDay = new Date(2025, 7, 8);
const timeLeft = registrationDay.valueOf() - today.valueOf();
// const registrationOpen = timeLeft > 0 ? false : true;
const registrationOpen = true;
const activeImage = ref<number>(1);

// form fields
const fullName = ref<string>();
const gender = ref<string>();
const dateOfBirth = ref<Date>();
const age = ref<number>();
const nationality = ref<string>();
const idNumber = ref<string>();
const emailAddress = ref<string>();
const phoneNumber = ref<string>();
const emergencyName = ref<string>();
const emergencyNumber = ref<string>();
const role = ref<string>();
const churchName = ref<string>();
const churchCode = ref<string>();
const leaderName = ref<string>();
const leaderNumber = ref<string>();
const size = ref<string>();
const swimming = ref<string>();
const allergies = ref<boolean>();
const allergiesInfo = ref<string>();
const medication = ref<boolean>();
const medicationInfo = ref<string>();
const graduating = ref<boolean>();
const launchConf = ref<boolean>();
const eyuCap = ref<boolean>();
const bw25LimitedShirt = ref<boolean>();
const bw25LimitedShirtSize = ref<string>();
const onlinePayment = ref<boolean>();

const errorText = ref();
const toasterError = ref<boolean>(false);
const toasterVisible = ref<boolean>(false);
const toasterTitle = ref<string>('Title');
const toasterDescription = ref<string>('Description');
const disableRegister = ref<boolean>(false);

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua & Deps",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Rep",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo {Democratic Rep}",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea North",
  "Korea South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "St Kitts & Nevis",
  "St Lucia",
  "Saint Vincent & the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const images = [
  "hero-image.png",
  "hero-image.png",
  "hero-image.png",
  "hero-image.png",
];

const metrics = [
  {
    value: "350+",
    text: "PARTICIPANTS AND VOLUNTEERS",
  },
  {
    value: "20+",
    text: "CONNECTED CHURCHES",
  },
  {
    value: "4",
    text: "MAIN SESSIONS",
  },
  {
    value: "35+",
    text: "REPRESENTED NATIONALITIES",
  },
];

const speakersInfo = [
  {
    name: "ARNO ALAJOKI",
    title: "National Director @ UAE YFC/EYU",
    image: "",
    description:
      "From the Nordic country of Finland, Arno has been living in the UAE since 2022. He holds a BA in Applied Theology and MTh in Systematic Theology. He is passionate about equipping and empowering the young generation to live out the purpose God has intended for them.",
  },
  {
    name: "FRANK MEYER",
    title: "Youth Pastor @ Fellowship Dubai",
    image: "",
    description:
      "Frank's been the go-to guru for teens in the UAE since 2011, masterfully guiding them through the wild ride of becoming young adults! He’s all about sparking those dreams while sprinkling in some good ol' Gospel inspiration. Talk about a motivational leader!",
  },
  {
    name: "ELIZABETH SHAHADA",
    title: "Young Adults Pastor @ Fellowship Dubai",
    image: "",
    description:
      "Meet Elizabeth, an Aussie-Egyptian with a degree in international business and corporate experience. Now focused on uplifting youth, she uses her event-planning skills to inspire young adults to live purposefully. In her free time, she enjoys table tennis, basketball, clean comedy, and puzzles!",
  },
  {
    name: "SAJEEL JOHN",
    title: "Pastor",
    image: "",
    description:
      "Sajeel has been serving in ministry for the last 9 years. From Pakistan, he's had the privilege to help in church planting in Africa and Pakistan, and currently leads a church in Dubai. He has served in youth ministry and works with adults throughout his ministry.",
  },
];

function changeActiveImage(left: boolean) {
  if (left)
    activeImage.value =
      activeImage.value == 1 ? images.length - 1 : activeImage.value - 1;
  else
    activeImage.value =
      activeImage.value == images.length - 1 ? 1 : activeImage.value + 1;
}

async function handleSubmit() {
  console.log(bw25LimitedShirt.value);
  console.log(bw25LimitedShirtSize.value);

  disableRegister.value = true;
  if (fullName.value == undefined) errorText.value = "Please enter full name";
  else if (gender.value == undefined) errorText.value = "Please choose gender";
  else if (dateOfBirth.value == undefined)
    errorText.value = "Please enter date of birth";
  else if (age.value == undefined) errorText.value = "Please enter age";
  else if (nationality.value == undefined)
    errorText.value = "Please enter nationality";
  else if (idNumber.value == undefined)
    errorText.value = "Please enter ID number ";
  else if (emailAddress.value == undefined)
    errorText.value = "Please enter email";
  else if (phoneNumber.value == undefined)
    errorText.value = "Please enter phone number";
  else if (emergencyName.value == undefined)
    errorText.value = "Please enter emergency contact name";
  else if (emergencyNumber.value == undefined)
    errorText.value = "Please enter emergency contact number";
  else if (role.value == undefined)
    errorText.value = "Please choose your role at BW2025";
  else if (churchName.value == undefined)
    errorText.value = "Please enter your church name";
  else if (churchCode.value == undefined)
    errorText.value = "Please enter your church code";
  else if (leaderName.value == undefined)
    errorText.value = "Please enter your leader's name";
  else if (leaderNumber.value == undefined)
    errorText.value = "Please enter your leader's contact number";
  else if (size.value == undefined)
    errorText.value = "Please choose your shirt size";
  else if (swimming.value == undefined)
    errorText.value = "Please choose your swimming proficiency";
  else if (allergies.value == undefined)
    errorText.value = "Please mention if you have allergies";
  else if (allergies.value && allergiesInfo.value == undefined)
    errorText.value = "Please mention your allergy information";
  else if (medication.value == undefined)
    errorText.value = "Please mention if you have medication";
  else if (medication.value && medicationInfo.value == undefined)
    errorText.value = "Please mention your medication information";
  else if (graduating.value == undefined)
    errorText.value = "Please mention if you are graduating";
  else if (graduating.value && launchConf.value == undefined)
    errorText.value = "Please mention your interest in Launch Conference 2025";
  else if (bw25LimitedShirt.value && bw25LimitedShirtSize.value == undefined)
    errorText.value = "Please pick your Big Weekend 2025 Limited Edition Shirt Size"
  else if (onlinePayment.value == undefined)
    errorText.value = "Please pick a payment method";
  else errorText.value = "";

  if (errorText.value != '') {
    enableToaster(true, 'Could not register', errorText.value)
    disableRegister.value = false;
    return ;
  }

  const res = await fetch(
    "https://afqmzmqsvbxdyxuqhwfv.supabase.co/functions/v1/register-user",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName.value,
        gender: gender.value,
        date_of_birth: dateOfBirth.value,
        age: age.value,
        role: role.value,
        nationality: nationality.value,
        id_number: idNumber.value,
        email: emailAddress.value,
        phone_number: phoneNumber.value,
        emergency_name: emergencyName.value,
        emergency_number: emergencyNumber.value,
        church_name: churchName.value,
        church_code: churchCode.value,
        youth_leader: leaderName.value,
        youth_number: leaderNumber.value,
        shirt_size: size.value,
        graduating: graduating.value,
        launch_conf: launchConf.value,
        swimming: swimming.value,
        allergies: allergies.value,
        allergies_info: allergiesInfo.value,
        medication: medication.value,
        medication_info: medicationInfo.value,
        "bw-25-shirt": bw25LimitedShirt.value,
        "bw-25-shirt-size": bw25LimitedShirtSize.value,
        eyu_cap: eyuCap.value,
        online_payment: onlinePayment.value,
        acknowledgement: true,
        paid: false,
      }),
    }
  );
  const data = await res.json();
  console.log(data);

  enableToaster(data['error'], data['title'], data['message'])
  disableRegister.value = false;
}

function enableToaster(error: boolean, title: string, description: string) {
  toasterVisible.value = true;
  
  toasterError.value = error;
  toasterTitle.value = title;
  toasterDescription.value = description;

  setTimeout(() => {
    toasterVisible.value = false;
  }, 5000);
}
</script>

<template>
  <Nav class="fixed z-50 w-11/12" />
  <Toaster class="fixed z-50 bottom-8 right-8" :visible="toasterVisible" :error="toasterError" :title="toasterTitle" :description="toasterDescription" />
  <div
    id="home"
    class="flex flex-col h-dvh w-full justify-center items-center relative gap-10"
  >
    <img
      class="w-full h-full object-cover absolute z-0"
      src="/hero-image.png"
    />
    <div class="flex flex-col gap-4">
      <h1 class="px-8 z-10 text-white font-bold text-5xl">BIG WEEKEND 2025</h1>
      <p class="z-10 text-white text-lg">October 17-19, 2025</p>
    </div>
    <a
      href="#signup"
      class="z-10 font-bold text-white text-lg pt-2 pb-1 px-4 border-2 rounded-lg border-white bg-primary hover:scale-105 transition-all"
    >
      APPLY NOW
    </a>
    <a href="#about" class="absolute z-10 bottom-16 w-10"
      ><img
        src="/arrow.png"
        class="h-auto w-full hover:scale-105 transition-all"
    /></a>
  </div>

  <div
    id="about"
    class="flex flex-col h-fit lg:h-dvh w-full justify-center items-center gap-10 lg:py-0 py-8"
  >
    <div
      class="flex lg:flex-row flex-col justify-between w-11/12 h-fit max-h-1/2 gap-10"
    >
      <div class="flex flex-col gap-8 w-full lg:w-1/3 grow">
        <h1 class="text-5xl font-bold text-primary w-full text-left">
          WHAT IS BIG WEEKEND?
        </h1>
        <p class="text-md text-justify w-full leading-12">
          Big Weekend is an event for 12-18 year old students. It consists of 2
          nights and three days of worship, fun & games, small group
          discussions, and four teaching sessions designed to support spiritual
          growth for teenagers in the Gulf region. It is an opportunity to meet
          other young people from our region and make new friends. Participants
          represent different cultural and church backgrounds.
        </p>
      </div>
      <div
        class="relative flex flex-col justify-center items-center w-full lg:w-1/3 grow rounded-lg"
      >
        <img
          class="object-cover w-full h-full rounded-lg"
          :src="images[activeImage]"
        />
        <button @click="changeActiveImage(true)">
          <img
            class="rotate-90 cursor-pointer absolute z-10 bottom-5/12 -left-4 mix-blend-difference"
            src="/arrow.png"
          />
        </button>
        <button @click="changeActiveImage(false)">
          <img
            class="-rotate-90 cursor-pointer absolute z-10 bottom-5/12 -right-4 mix-blend-difference"
            src="/arrow.png"
          />
        </button>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 w-11/12 h-fit">
      <div
        v-for="item in metrics"
        class="min-w-28 w-1/5 h-50 box-border rounded-lg p-4 grow bg-secondary flex flex-col justify-center items-center gap-4"
      >
        <span class="text-white font-bold text-5xl">{{ item.value }}</span>
        <div class="h-1/3 w-full flex items-center justify-center">
          <span class="text-white text-lg">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    id="theme"
    class="flex flex-col h-fit lg:h-dvh w-full justify-center items-center gap-10 lg:py-0 py-8"
  >
    <img
      src="/theme-logo.png"
      class="min-w-72 h-auto max-w-2/5 hidden lg:block"
    />
    <div class="lg:hidden flex flex-col justify-center items-center">
      <img src="/theme-logo-2.png" class="min-w-72 h-auto max-w-2/5" />
      <img src="/theme-logo-1.png" class="min-w-72 h-auto max-w-2/5" />
    </div>
    <p class="text-center lg:w-3/5 w-11/12">
      How do you know what is real? Sometimes knowing the difference between
      what is real and what is fake is difficult unless you are familiar with
      the real thing. Looking at a designer bag and a well made copy of it can
      fool you if you don’t know what the real thing really is like. Or looking
      at a photo evidence of something that has happened. How do you know that
      this is not an AI generated photo but the real thing? For a long time
      apostle Paul was living a life that was being influenced by something that
      looked real but was in fact fake. It wasn’t until he met the real person
      of Jesus that he learned that what he thought was real was in fact fake.
      Meeting the real thing changed his life forever. This year at Big Weekend
      we will dive into Philippians chapter 3 to see what it is to be 4REAL.
    </p>
    <div
      class="flex flex-row not-lg:flex-wrap lg:gap-8 items-center justify-between w-11/12"
    >
      <img
        class="m-auto max-w-1/2 not-lg:grow not-lg:min-w-50 lg:w-1/4 order-2 lg:order-1"
        src="/verse-of-the-theme.png"
      />
      <iframe
        class="aspect-video grow w-full lg:max-w-1/2 min-w-1/3 rounded-lg order-1 lg:order-2"
        src="https://www.youtube.com/embed/MkhsM8vQ1PA?si=P-CydsPiygdHj9-G&amp;controls=0"
        title="Welcome to Big Weekend 2025"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
      <img
        class="m-auto max-w-1/2 not-lg:grow not-lg:min-w-50 lg:w-1/4 order-3 lg:order-3"
        src="/4real-logos.png"
      />
    </div>
  </div>

  <div
    id="speakers"
    class="flex flex-col h-fit lg:h-dvh w-full justify-center items-center gap-10"
  >
    <h1 class="text-5xl font-bold text-primary w-full text-center">
      MEET THE SPEAKERS
    </h1>
    <div class="flex flex-wrap justify-center items-center w-11/12">
      <div
        v-for="speaker in speakersInfo"
        class="w-full lg:max-w-1/2 min-h-64 grow flex not-sm:flex-col gap-4 p-4"
      >
        <img
          :src="speaker.image"
          class="not-sm:w-full not-sm:aspect-video w-1/2 border object-cover object-center rounded-lg bg-black"
        />
        <div class="not-sm:w-full w-1/2 flex flex-col gap-2 items-start">
          <h2 class="text-2xl font-bold text-secondary">{{ speaker.name }}</h2>
          <h3 class="text-md font-bold text-tertiary">
            {{ speaker.title }}
          </h3>
          <p class="text-md text-justify">
            {{ speaker.description }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div
    id="signup"
    class="flex flex-col h-fit min-h-[50dvh] w-full justify-center items-center gap-15 py-30"
  >
    <div class="flex flex-col gap-2">
      <h1 class="text-5xl font-bold text-primary w-full text-center">
        SIGN UP
      </h1>
      <p>Registration opens August 8 2025</p>
    </div>

    <form
      v-if="registrationOpen"
      @submit.prevent=""
      class="flex flex-wrap gap-4 w-1/2 min-w-72"
    >
      <p class="w-full text-left font-semibold text-xl">Personal Information</p>
      <TextInput
        v-model="fullName"
        :title="'Full Name'"
        :placeholder="'Enter full name'"
        :error="fullName == undefined || fullName == ''"
      />
      <DropdownInput
        v-model="gender"
        :title="'Gender'"
        :options="['Male', 'Female']"
        :placeholder="'Choose gender'"
        :error="gender == undefined"
      />
      <DateInput
        v-model="dateOfBirth"
        :title="'Date of Birth'"
        :placeholder="'xx/xx/xxxx'"
        :error="dateOfBirth == undefined"
      />
      <NumberInput
        v-model="age"
        :title="'Age (as of July 1, 2025)'"
        :placeholder="'Enter age'"
        :error="age == undefined"
      />
      <DropdownInput
        v-model="nationality"
        :title="'Nationality'"
        :options="countryList"
        :placeholder="'Choose country'"
        :error="nationality == undefined"
      />
      <TextInput
        v-model="idNumber"
        :title="'Emirates ID / Passport Number'"
        :placeholder="'Emirates ID preferred'"
        :error="idNumber == undefined"
      />
      <TextInput
        v-model="emailAddress"
        :title="'Email Address'"
        :placeholder="'e.g.: example@eyu.com'"
        :error="emailAddress == undefined"
      />
      <TextInput
        v-model="phoneNumber"
        :title="'Phone Number'"
        :placeholder="'e.g.: +9715XXXXXXXX'"
        :error="phoneNumber == undefined"
      />
      <TextInput
        v-model="emergencyName"
        :title="'Emergency Contact Name'"
        :placeholder="'Enter name'"
        :error="emergencyName == undefined"
      />
      <TextInput
        v-model="emergencyNumber"
        :title="'Emergency Contact Number'"
        :placeholder="'e.g.: +9715XXXXXXXX'"
        :error="emergencyNumber == undefined"
      />
      <DropdownInput
        v-model="role"
        :title="'What are you signing up as? (Leader/Student)'"
        :options="['Leader', 'Senior', 'Junior']"
        :placeholder="'Choose role'"
        :error="role == undefined"
      />
      <p class="w-full text-left font-semibold text-xl">Church Information</p>
      <TextInput
        v-model="churchName"
        :title="'Church Name'"
        :placeholder="'Enter church name'"
        :error="churchName == undefined"
      />
      <NumberInput
        v-model="churchCode"
        :title="'Church Code'"
        :placeholder="'e.g.: 1234'"
        :error="churchCode == undefined"
      />
      <TextInput
        v-model="leaderName"
        :title="'Youth Group Leader Name'"
        :placeholder="'Enter leader\'s name'"
        :error="leaderName == undefined"
      />
      <TextInput
        v-model="leaderNumber"
        :title="'Youth Group Leader Contact'"
        :placeholder="'Enter leader\'s number'"
        :error="leaderNumber == undefined"
      />
      <p class="w-full text-left font-semibold text-xl">
        Additional Information
      </p>
      <DropdownInput
        v-model="size"
        :title="'T-Shirt Size'"
        :options="['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']"
        :placeholder="'Choose shirt size'"
        :error="size == undefined"
      />
      <DropdownInput
        v-model="swimming"
        :title="'Swimming Ability'"
        :options="['Beginner', 'Intermediate', 'Advanced']"
        :placeholder="'Choose proficiency level'"
        :error="swimming == undefined"
      />
      <DropdownInput
        v-model="allergies"
        :title="'Any allergies/medical conditions?'"
        :options="[true, false]"
        :placeholder="'Choose option'"
        :error="allergies == undefined"
      />
      <TextInput
        v-model="allergiesInfo"
        :title="'Allergy/Medical Information'"
        :placeholder="'Please specify'"
        :error="allergiesInfo == undefined"
        :disabled="allergies == undefined || allergies == false"
      />
      <DropdownInput
        v-model="medication"
        :title="'Are you currently on any medication?'"
        :options="[true, false]"
        :placeholder="'Choose option'"
        :error="medication == undefined"
      />
      <TextInput
        v-model="medicationInfo"
        :title="'Medication Information'"
        :placeholder="'Please specify'"
        :error="medicationInfo == undefined"
        :disabled="medication == undefined || medication == false"
      />
      <p class="w-full text-left font-semibold text-xl">Seniors Conference</p>
      <DropdownInput
        v-model="graduating"
        :title="'Are you graduating school in 2025-26?'"
        :options="[true, false]"
        :placeholder="'Choose option'"
        :error="graduating == undefined"
      />
      <DropdownInput
        v-model="launchConf"
        :title="'Interest for Launch Conference?'"
        :options="[true, false]"
        :placeholder="'Choose option'"
        :error="launchConf == undefined"
        :disabled="graduating == undefined || graduating == false"
      />
      <p class="w-full text-left font-semibold text-xl">
        Merchandise Pre-Orders
      </p>
      <p class="w-full text-left">
        This section is for those who would like to pre-purchase additional
        merchandise prior to the event. Merchandise must be paid for during
        registration payment and can be collected at the event.
      </p>
      <CheckboxInput v-model="eyuCap" :use-image="true" :title="'EYU Cap'" />
      <CheckboxInput
        v-model="bw25LimitedShirt"
        :use-image="true"
        :title="'Big Weekend 2025 Limited Edition Shirt'"
      />
      <DropdownInput
        v-model="bw25LimitedShirtSize"
        :disabled="bw25LimitedShirt != true"
        :options="['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']"
        :placeholder="'Choose size'"
        :title="'Big Weekend 2025 Limited Edition Shirt Size'"
      />
      <p class="w-full text-left font-semibold text-xl">
        Payment Method
        <span
          v-if="onlinePayment == undefined"
          class="font-semibold text-red-900 text-lg"
          >Required</span
        >
      </p>
      <div class="flex gap-2">
        <input
          name="paymentOptions"
          v-model="onlinePayment"
          value="true"
          type="radio"
        />
        <label class="text-left"
          >Online Payment (redirects to payment link)</label
        >
      </div>
      <div class="flex gap-2">
        <input
          name="paymentOptions"
          v-model="onlinePayment"
          value="false"
          type="radio"
        />
        <label class="text-left"
          >I am applying for a scholarship through my church</label
        >
      </div>
      <p class="w-full text-left">
        By submitting this form, I confirm that all information provided is
        accurate to the best of my knowledge. I understand that participation in
        Big Weekend 2025 is contingent on submitting required documentation, on
        completing the full payment, and the information submitted here being
        correct and valid.
      </p>
      <button
        type="submit"
        @click="handleSubmit"
        :disabled="disableRegister"
        class="disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer bg-secondary text-white rounded-lg pt-2 pb-1 px-4 font-semibold"
      >
        Register
      </button>
      <p class="font-semibold text-center text-red-900 pt-2">{{ errorText }}</p>
    </form>

    <div v-else="!registrationOpen">
      <vue-countdown :time="timeLeft" v-slot="{ days, hours, minutes, seconds }">
        <div class="flex gap-1">
          
          <div class="flex flex-col gap-2">
            <p class="text-3xl w-16 text-center border rounded-lg pb-2 pt-4 bg-secondary text-white font-semibold">
              {{ days }}
            </p>
            <p>DAYS</p>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-3xl w-16 text-center border rounded-lg pb-2 pt-4 bg-secondary text-white font-semibold">
              {{ hours }}
            </p>
            <p>HOURS</p>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-3xl w-16 text-center border rounded-lg pb-2 pt-4 bg-secondary text-white font-semibold">
              {{ minutes }}
            </p>
            <p>MINUTES</p>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-3xl w-16 text-center border rounded-lg pb-2 pt-4 bg-secondary text-white font-semibold">
              {{ seconds }}
            </p>
            <p>SECONDS</p>
          </div>
        </div>
      </vue-countdown>
    </div>
  </div>

  <div id="footer" class="flex justify-center items-center w-full h-fit">
    <div
      class="text-white bg-background-layer flex flex-col lg:flex-row lg:gap-0 gap-8 justify-between items-center lg:items-start w-11/12 p-8 rounded-lg mb-8"
    >
      <img src="/bw-25-logo.png" class="aspect-auto h-10" />
      <div class="flex flex-col gap-2">
        <a class="text-md text-left" href="#about">about</a>
        <a class="text-md text-left" href="#theme">theme</a>
        <a class="text-md text-left" href="#speakers">speakers</a>
      </div>
      <div class="flex flex-col gap-2">
        <a class="text-md text-left" href="#sign-up">sign up</a>
      </div>
      <div class="flex gap-10">
        <a href="/"><img class="h-6 w-6" src="/mail.png" /></a>
        <a href="/"><img class="h-6 w-6 ml-1.5" src="/whatsapp.png" /></a>
        <a href="/"><img class="h-6 w-6" src="/instagram.png" /></a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
