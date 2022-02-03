<template>
	<div class="">
		<b-input-group class="input">
			<button class="inputpre">
				<img src="../assets/search.png" alt />
			</button>

			<v-select
				class="vselect"
				placeholder="Search for location"
				style="border: none"
				v-model="selectedCity"
				@input="getTime"
				@search="onSearch"
				:options="cities"
				label="name"
				:filterable="false"
			>
				<template slot="no-options"
					>type to search for weather..</template
				>
				<template slot="option" slot-scope="option">
					<div v-bind:key="option.name" class="d-center">
						{{ option.name }}
					</div>
				</template>
				<template slot="selected-option" slot-scope="option">
					<div class="selected d-center">
						<div class="d-center">{{ option.name }}</div>
					</div>
				</template>
			</v-select>
			<button class="inputpre">
				<img src="../assets/target.png" alt />
			</button>
		</b-input-group>

		<div class="word-clock">
			<div class="info">
				<p>Timezone: {{ timezone }}</p>
				<p>City: {{ selectedCity }}</p>
			</div>
			<div
				class="word-clock-row text-justify"
				v-for="(row, i) in clockWords"
				:key="i"
			>
				<span
					v-for="word in row"
					:key="word.class"
					v-html="word.word"
					:class="[
						illuminated.includes(word.class) ? 'illuminated' : '',
					]"
				></span>
			</div>
		</div>
		<div style="padding: 12px">
			<p>Made with ❤️ in <b>Vue</b></p>
			<a href="https://github.com/bhavinp16" style="color: grey">
				bhavinp16
			</a>
		</div>
	</div>
</template>

<script>
const clockWords = [
	[
		{ word: 'its', class: 'its' },
		{ word: 'half', class: 'half' },
		{ word: 'ten', class: 'ten-min' },
	],
	[
		{ word: 'quarter', class: 'quarter' },
		{ word: 'twenty', class: 'twenty-min' },
	],
	[
		{ word: 'five', class: 'five-min' },
		{ word: 'minutes', class: 'minutes' },
		{ word: 'to', class: 'to' },
	],
	[
		{ word: 'past', class: 'past' },
		{ word: 'one', class: 'one' },
		{ word: 'two', class: 'two' },
	],
	[
		{ word: 'three', class: 'three' },
		{ word: 'four', class: 'four' },
		{ word: 'five', class: 'five' },
	],
	[
		{ word: 'six', class: 'six' },
		{ word: 'seven', class: 'seven' },
		{ word: 'eight', class: 'eight' },
	],
	[
		{ word: 'nine', class: 'nine' },
		{ word: 'ten', class: 'ten' },
		{ word: 'eleven', class: 'eleven' },
	],
	[
		{ word: 'twelve', class: 'twelve' },
		{ word: "o'clock", class: "o'clock" },
	],
];

const numberWords = [
	'twelve',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve',
];

import axios from 'axios';
import { find } from 'geo-tz';

export default {
	data() {
		return {
			selectedCity: '',
			cities: [],
			date: new Date(),
			clockWords: clockWords,
			timezone: 'Asia/Kolkata',
		};
	},

	methods: {
		// City Search
		onSearch(search, loading) {
			this.cities = [];
			if (search.length) {
				loading(true);
				this.search(loading, search, this);
			}
		},

		search(loading, search) {
			let cityarr = [];
			if (search != null && search.length >= 3) {
				axios
					.get(
						'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' +
							'G8JO484eu7AGsERAutseLf78kWsBdrWj' +
							'&language=' +
							'en-en' +
							'&q=' +
							search
					)
					.then((Response) => {
						let res = Response.data;
						loading(false);
						res.map((item) => {
							cityarr.push(item.LocalizedName);
						});
						this.cities = cityarr;
					})
					.catch((error) => {
						this.$notify({ type: 'error', text: error });
					});
			}
		},

		//With Select
		async getTime() {
			let city = this.selectedCity;

			const params = {
				auth: '674652107933534458792x103523',
				locate: city,
				json: '1',
			};

			// getting lat and long from city name
			axios
				.get('https://geocode.xyz', { params })
				.then((response) => {
					let lat = parseFloat(response.data.latt);
					let long = parseFloat(response.data.longt);

					// getting timezone from lat and long
					let timezonee = find(lat, long);
					this.timezone = timezonee[0];
				})
				.catch((error) => {
					console.log(error);
				});
		},

		resetapp() {
			this.$router.go(0);
		},

		updatedate() {
			let datee = new Date().toLocaleString('en-US', {
				timeZone: this.timezone,
			});
			this.date = new Date(datee);
			console.log(this.timezone);
		},
	},
	computed: {
		mins() {
			return this.date.getMinutes();
		},
		hours() {
			let hours = this.date.getHours(),
				hourOffset = hours > 12 ? -12 : 0,
				minOffset = this.mins >= 35 && this.mins < 60 ? 1 : 0;

			return parseInt(hours + hourOffset + minOffset, 10);
		},
		illuminated() {
			let words = ['its'];

			if (this.mins >= 0 && this.mins < 5) {
				words.push("o'clock");
			} else if (this.mins >= 5 && this.mins < 10) {
				words.push('five-min');
				words.push('minutes');
			} else if (this.mins >= 10 && this.mins < 15) {
				words.push('ten-min');
				words.push('minutes');
			} else if (this.mins >= 15 && this.mins < 20) {
				words.push('quarter');
			} else if (this.mins >= 20 && this.mins < 25) {
				words.push('twenty-min');
				words.push('minutes');
			} else if (this.mins >= 25 && this.mins < 30) {
				words.push('twenty-min');
				words.push('five-min');
				words.push('minutes');
			} else if (this.mins >= 30 && this.mins < 35) {
				words.push('half');
			} else if (this.mins >= 35 && this.mins < 40) {
				words.push('twenty-min');
				words.push('five-min');
				words.push('minutes');
			} else if (this.mins >= 40 && this.mins < 45) {
				words.push('twenty-min');
				words.push('minutes');
			} else if (this.mins >= 45 && this.mins < 50) {
				words.push('quarter');
			} else if (this.mins >= 50 && this.mins < 55) {
				words.push('ten-min');
				words.push('minutes');
			} else if (this.mins >= 55 && this.mins < 60) {
				words.push('five-min');
				words.push('minutes');
			}

			if (this.mins >= 5 && this.mins < 35) {
				words.push('past');
			} else if (this.mins >= 35 && this.mins < 60) {
				words.push('to');
			}

			words.push(numberWords[this.hours]);

			return words;
		},
	},
	mounted() {
		setInterval(() => this.updatedate(), 2000);
	},
};
</script>

<style>
.vselect .vs__search::placeholder,
.vselect .vs__dropdown-toggle {
	background: white;
	border: none;
	border-radius: 0;
	width: 100%;
	height: 50px;
	color: rgba(0, 0, 0, 0.699);
}

.word-clock {
	font-family: monospace;
	font-size: 20px;
	line-height: 20px;
	background: #181616;
	height: 70vh;
	color: rgba(255, 255, 255, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.word-clock-row {
	display: flex;
}

.word-clock-row span {
	margin: 0 5px;
	display: inline-block;
	transition: all 1s ease-in-out;
}

.word-clock-row span.illuminated {
	color: #fff;
}

.input {
	margin-top: 20px;
	margin-bottom: 20px;
}

.info {
	margin-top: 0px;
	margin-bottom: 100px;
	color: rgba(255, 255, 255, 0.836);
	flex: 'column';
	justify-content: flex-start;
	align-content: flex-start;
}
</style>
