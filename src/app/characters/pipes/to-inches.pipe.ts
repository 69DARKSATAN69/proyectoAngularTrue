import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toInches'
})
export class ToInchesPipe implements PipeTransform {

  transform(cms: number, ...args: unknown[]): string {
	let final = "";

	final = cms+" cms / "+(cms/2.54).toFixed(2)+" inches";
    return final;
  }

}
