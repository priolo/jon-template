/* eslint eqeqeq: "off" */
import i18n from "i18next";

// regole da applicare ai "validator"
export const rules = {

	obligatory: v => {
		if (v != null && v.trim().length > 0 ) return
		return i18n.t("validation.obligatory")
	},

	repassword: v2=>v1=>{
		if ( v1==v2 ) return
		return i18n.t("validation.same_password")
	},

	notTheSame: v2=>v1=>{
		if ( v1!=v2 ) return
		return i18n.t("validation.not_the_same")
	},
	
}
