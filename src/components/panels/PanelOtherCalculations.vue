<template>
    <div>
        <div class="panel-table m-t-50" v-show="showPanel">
            <div class="row m-0 p-b-20">
                            <span class="border-lines col-12">
                                <label>Otros cálculos</label>
                            </span>
                <template v-for="(calculationInfo) in calculationsInfo">
                    <div class="col-6 p-l-20 p-r-20 p-t-20">
                        <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> {{calculationInfo.name}} - {{calculationInfo.description}}</p>
                    </div>
                    <div class="col-6 p-l-20 p-r-20 p-t-20">
                        <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                            {{displayResult(calculationInfo.result, calculationInfo.displayForm)}}
                        </p>
                    </div>
                </template>
                <template v-for="(calculationInfoArray) in dualCalculationsInfoGroupedByHash">
                    <div class="col-4 p-l-20 p-r-20 p-t-20">
                        <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> {{calculationInfoArray[0].name || calculationInfoArray[1].name}} - {{calculationInfoArray[0].description || calculationInfoArray[1].description}}</p>
                    </div>
                    <div class="col-4 p-l-20 p-r-20 p-t-20">
                        <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                            {{displayResult(calculationInfoArray[0].result, calculationInfoArray[0].displayForm)}}
                        </p>
                    </div>
                    <div class="col-4 p-l-20 p-r-20 p-t-20">
                        <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                            {{displayResult(calculationInfoArray[1].result, calculationInfoArray[1].displayForm)}}
                        </p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        methods: {
            displayResult(value, displayForm) {
                if (value === undefined || value === null) {
                    return '---';
                }
                displayForm = displayForm || 'NORMAL';
                switch (displayForm) {
                    case 'AMOUNT': return "$" + value;
                    case 'PERCENTAGE': return value +"%";
                    case 'NORMAL': 
                    default:
                        return value;
                }
            }
        },
        computed: {
            showPanel() {
                return (this.calculationsInfo && this.calculationsInfo.length) || (this.dualCalculationsInfoGroupedByHash && this.dualCalculationsInfoGroupedByHash.length)
            },
            dualCalculationsInfoGroupedByHash() {
                if (!this.leftCalculationsInfo || !this.rightCalculationsInfo) {
                    return [];
                }
                
                let resultArray = [];
                let rightCalculationsInfoByHash = {};

                this.rightCalculationsInfo.forEach((rightCalculationInfo) => {
                    rightCalculationsInfoByHash[rightCalculationInfo.hash] = rightCalculationInfo;
                });

                this.leftCalculationsInfo.forEach((leftCalculationInfo) => {
                    let rightCalculationInfo = rightCalculationsInfoByHash[leftCalculationInfo.hash] || {};

                    resultArray.push([leftCalculationInfo, rightCalculationInfo]);
                });

                this.rightCalculationsInfo.forEach((rightCalculationInfo) => {
                    if (!rightCalculationsInfoByHash[rightCalculationInfo.hash]) {
                        let leftCalculationInfo = {};
                        resultArray.push([leftCalculationInfo, rightCalculationInfo]);
                    }
                });
                
                return resultArray;
            }
        },
        props: {
            calculationsInfo: {
                type: Array,
                default: () => []
            },
            leftCalculationsInfo: {
                type: Array,
                default: () => []
            },
            rightCalculationsInfo: {
                type: Array,
                default: () => []
            },
            columns: {
                type: Number,
                default: 1
            }
        }
    }
</script>