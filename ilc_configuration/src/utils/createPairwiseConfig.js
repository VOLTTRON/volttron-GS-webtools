import {_PAIRWISE} from '../constants/strings'

export function createPairwiseConfiguration (configuration, clusterFocus) {
    let pairwise = {};
    let pairwiseContent = {};
    // set new pairwise curtail values when rearranging criteria
    for (let index in configuration["criteria"][clusterFocus]){
      let criteriaName = configuration["criteria"][clusterFocus][index]["text"];
      for(let innerIndex = index; innerIndex < configuration["criteria"][clusterFocus].length; innerIndex++){
        let comparisonName = configuration["criteria"][clusterFocus][innerIndex]["text"];
        if (criteriaName === comparisonName){
          continue
        }
        if(!pairwiseContent[comparisonName]){
            pairwiseContent[comparisonName] = 1; // TODO: Fix this to copy over old values
        }
      
      }
      pairwise[criteriaName] = pairwiseContent
      pairwiseContent = {};
    }
    configuration[`${clusterFocus}${_PAIRWISE}`]["curtail"] = JSON.parse(JSON.stringify(pairwise));
    if (configuration[`${clusterFocus}${_PAIRWISE}`]["augment"]){
      configuration[`${clusterFocus}${_PAIRWISE}`]["augment"] = JSON.parse(JSON.stringify(pairwise));
    }
    return configuration;
}