<template>
    <div>
        <div class="panel-table m-t-50" v-show="showPanel">
            <div class="row m-0 p-b-20">
                            <span class="border-lines col-12">
                                <label>Datos generales</label>
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
                let num = Number(value);
                displayForm = displayForm || 'NORMAL';
                switch (displayForm) {
                    case 'AMOUNT': return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    case 'PERCENTAGE':
                        if(isNaN(num)){
                            return "0.00%"
                        }
                        if(String(num).split('.').length == 2 && String(num).split('.')[1].length >= 4){
                            return value.toFixed(4) +"%";
                        } else if(String(num).split('.') < 2){
                            return value.toFixed(2) +"%";
                        }
                        return value +"%";
                        break;
                    case 'NORMAL':
                        if(isNaN(num)){
                            return 0
                        }
                        if(String(num).split('.').length == 2 && String(num).split('.')[1].length >= 4){
                            return value.toFixed(4) ;
                        }
                        return value;
                        break;
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