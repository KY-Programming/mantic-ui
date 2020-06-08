import { DropdownValue } from '@mantic-ui/angular';

export class DemoData {
    public static readonly countries: DropdownValue<string>[] = [
        { value: 'af', text: 'Afghanistan', icon: 'af flag' },
        { value: 'ax', text: 'Aland Islands', icon: 'ax flag' },
        { value: 'al', text: 'Albania', icon: 'al flag' },
        { value: 'dz', text: 'Algeria', icon: 'dz flag' },
        { value: 'as', text: 'American Samoa', icon: 'as flag' },
        { value: 'ad', text: 'Andorra', icon: 'ad flag' },
        { value: 'ao', text: 'Angola', icon: 'ao flag' },
        { value: 'ai', text: 'Anguilla', icon: 'ai flag' },
        { value: 'ag', text: 'Antigua', icon: 'ag flag' },
        { value: 'ar', text: 'Argentina', icon: 'ar flag' },
        { value: 'am', text: 'Armenia', icon: 'am flag' },
        { value: 'aw', text: 'Aruba', icon: 'aw flag' },
        { value: 'au', text: 'Australia', icon: 'au flag' },
        { value: 'at', text: 'Austria', icon: 'at flag' },
        { value: 'az', text: 'Azerbaijan', icon: 'az flag' },
        { value: 'bs', text: 'Bahamas', icon: 'bs flag' },
        { value: 'bh', text: 'Bahrain', icon: 'bh flag' },
        { value: 'bd', text: 'Bangladesh', icon: 'bd flag' },
        { value: 'bb', text: 'Barbados', icon: 'bb flag' },
        { value: 'by', text: 'Belarus', icon: 'by flag' },
        { value: 'be', text: 'Belgium', icon: 'be flag' },
        { value: 'bz', text: 'Belize', icon: 'bz flag' },
        { value: 'bj', text: 'Benin', icon: 'bj flag' },
        { value: 'bm', text: 'Bermuda', icon: 'bm flag' },
        { value: 'bt', text: 'Bhutan', icon: 'bt flag' },
        { value: 'bo', text: 'Bolivia', icon: 'bo flag' },
        { value: 'ba', text: 'Bosnia', icon: 'ba flag' },
        { value: 'bw', text: 'Botswana', icon: 'bw flag' },
        { value: 'bv', text: 'Bouvet Island', icon: 'bv flag' },
        { value: 'br', text: 'Brazil', icon: 'br flag' },
        { value: 'vg', text: 'British Virgin Islands', icon: 'vg flag' },
        { value: 'bn', text: 'Brunei', icon: 'bn flag' },
        { value: 'bg', text: 'Bulgaria', icon: 'bg flag' },
        { value: 'bf', text: 'Burkina Faso', icon: 'bf flag' },
        { value: 'mm', text: 'Burma', icon: 'mm flag' },
        { value: 'bi', text: 'Burundi', icon: 'bi flag' },
        { value: 'tc', text: 'Caicos Islands', icon: 'tc flag' },
        { value: 'kh', text: 'Cambodia', icon: 'kh flag' },
        { value: 'cm', text: 'Cameroon', icon: 'cm flag' },
        { value: 'ca', text: 'Canada', icon: 'ca flag' },
        { value: 'cv', text: 'Cape Verde', icon: 'cv flag' },
        { value: 'ky', text: 'Cayman Islands', icon: 'ky flag' },
        { value: 'cf', text: 'Central African Republic', icon: 'cf flag' },
        { value: 'td', text: 'Chad', icon: 'td flag' },
        { value: 'cl', text: 'Chile', icon: 'cl flag' },
        { value: 'cn', text: 'China', icon: 'cn flag' },
        { value: 'cx', text: 'Christmas Island', icon: 'cx flag' },
        { value: 'cc', text: 'Cocos Islands', icon: 'cc flag' },
        { value: 'co', text: 'Colombia', icon: 'co flag' },
        { value: 'km', text: 'Comoros', icon: 'km flag' },
        { value: 'cg', text: 'Congo Brazzaville', icon: 'cg flag' },
        { value: 'cd', text: 'Congo', icon: 'cd flag' },
        { value: 'ck', text: 'Cook Islands', icon: 'ck flag' },
        { value: 'cr', text: 'Costa Rica', icon: 'cr flag' },
        { value: 'ci', text: 'Cote Divoire', icon: 'ci flag' },
        { value: 'hr', text: 'Croatia', icon: 'hr flag' },
        { value: 'cu', text: 'Cuba', icon: 'cu flag' },
        { value: 'cy', text: 'Cyprus', icon: 'cy flag' },
        { value: 'cz', text: 'Czech Republic', icon: 'cz flag' },
        { value: 'dk', text: 'Denmark', icon: 'dk flag' },
        { value: 'dj', text: 'Djibouti', icon: 'dj flag' },
        { value: 'dm', text: 'Dominica', icon: 'dm flag' },
        { value: 'do', text: 'Dominican Republic', icon: 'do flag' },
        { value: 'ec', text: 'Ecuador', icon: 'ec flag' },
        { value: 'eg', text: 'Egypt', icon: 'eg flag' },
        { value: 'sv', text: 'El Salvador', icon: 'sv flag' },
        { value: 'gb', text: 'England', icon: 'gb flag' },
        { value: 'gq', text: 'Equatorial Guinea', icon: 'gq flag' },
        { value: 'er', text: 'Eritrea', icon: 'er flag' },
        { value: 'ee', text: 'Estonia', icon: 'ee flag' },
        { value: 'et', text: 'Ethiopia', icon: 'et flag' },
        { value: 'eu', text: 'European Union', icon: 'eu flag' },
        { value: 'fk', text: 'Falkland Islands', icon: 'fk flag' },
        { value: 'fo', text: 'Faroe Islands', icon: 'fo flag' },
        { value: 'fj', text: 'Fiji', icon: 'fj flag' },
        { value: 'fi', text: 'Finland', icon: 'fi flag' },
        { value: 'fr', text: 'France', icon: 'fr flag' },
        { value: 'gf', text: 'French Guiana', icon: 'gf flag' },
        { value: 'pf', text: 'French Polynesia', icon: 'pf flag' },
        { value: 'tf', text: 'French Territories', icon: 'tf flag' },
        { value: 'ga', text: 'Gabon', icon: 'ga flag' },
        { value: 'gm', text: 'Gambia', icon: 'gm flag' },
        { value: 'ge', text: 'Georgia', icon: 'ge flag' },
        { value: 'de', text: 'Germany', icon: 'de flag' },
        { value: 'gh', text: 'Ghana', icon: 'gh flag' },
        { value: 'gi', text: 'Gibraltar', icon: 'gi flag' },
        { value: 'gr', text: 'Greece', icon: 'gr flag' },
        { value: 'gl', text: 'Greenland', icon: 'gl flag' },
        { value: 'gd', text: 'Grenada', icon: 'gd flag' },
        { value: 'gp', text: 'Guadeloupe', icon: 'gp flag' },
        { value: 'gu', text: 'Guam', icon: 'gu flag' },
        { value: 'gt', text: 'Guatemala', icon: 'gt flag' },
        { value: 'gw', text: 'Guinea-Bissau', icon: 'gw flag' },
        { value: 'gn', text: 'Guinea', icon: 'gn flag' },
        { value: 'gy', text: 'Guyana', icon: 'gy flag' },
        { value: 'ht', text: 'Haiti', icon: 'ht flag' },
        { value: 'hm', text: 'Heard Island', icon: 'hm flag' },
        { value: 'hn', text: 'Honduras', icon: 'hn flag' },
        { value: 'hk', text: 'Hong Kong', icon: 'hk flag' },
        { value: 'hu', text: 'Hungary', icon: 'hu flag' },
        { value: 'is', text: 'Iceland', icon: 'is flag' },
        { value: 'in', text: 'India', icon: 'in flag' },
        { value: 'io', text: 'Indian Ocean Territory', icon: 'io flag' },
        { value: 'id', text: 'Indonesia', icon: 'id flag' },
        { value: 'ir', text: 'Iran', icon: 'ir flag' },
        { value: 'iq', text: 'Iraq', icon: 'iq flag' },
        { value: 'ie', text: 'Ireland', icon: 'ie flag' },
        { value: 'il', text: 'Israel', icon: 'il flag' },
        { value: 'it', text: 'Italy', icon: 'it flag' },
        { value: 'jm', text: 'Jamaica', icon: 'jm flag' },
        { value: 'jp', text: 'Japan', icon: 'jp flag' },
        { value: 'jo', text: 'Jordan', icon: 'jo flag' },
        { value: 'kz', text: 'Kazakhstan', icon: 'kz flag' },
        { value: 'ke', text: 'Kenya', icon: 'ke flag' },
        { value: 'ki', text: 'Kiribati', icon: 'ki flag' },
        { value: 'kw', text: 'Kuwait', icon: 'kw flag' },
        { value: 'kg', text: 'Kyrgyzstan', icon: 'kg flag' },
        { value: 'la', text: 'Laos', icon: 'la flag' },
        { value: 'lv', text: 'Latvia', icon: 'lv flag' },
        { value: 'lb', text: 'Lebanon', icon: 'lb flag' },
        { value: 'ls', text: 'Lesotho', icon: 'ls flag' },
        { value: 'lr', text: 'Liberia', icon: 'lr flag' },
        { value: 'ly', text: 'Libya', icon: 'ly flag' },
        { value: 'li', text: 'Liechtenstein', icon: 'li flag' },
        { value: 'lt', text: 'Lithuania', icon: 'lt flag' },
        { value: 'lu', text: 'Luxembourg', icon: 'lu flag' },
        { value: 'mo', text: 'Macau', icon: 'mo flag' },
        { value: 'mk', text: 'Macedonia', icon: 'mk flag' },
        { value: 'mg', text: 'Madagascar', icon: 'mg flag' },
        { value: 'mw', text: 'Malawi', icon: 'mw flag' },
        { value: 'my', text: 'Malaysia', icon: 'my flag' },
        { value: 'mv', text: 'Maldives', icon: 'mv flag' },
        { value: 'ml', text: 'Mali', icon: 'ml flag' },
        { value: 'mt', text: 'Malta', icon: 'mt flag' },
        { value: 'mh', text: 'Marshall Islands', icon: 'mh flag' },
        { value: 'mq', text: 'Martinique', icon: 'mq flag' },
        { value: 'mr', text: 'Mauritania', icon: 'mr flag' },
        { value: 'mu', text: 'Mauritius', icon: 'mu flag' },
        { value: 'yt', text: 'Mayotte', icon: 'yt flag' },
        { value: 'mx', text: 'Mexico', icon: 'mx flag' },
        { value: 'fm', text: 'Micronesia', icon: 'fm flag' },
        { value: 'md', text: 'Moldova', icon: 'md flag' },
        { value: 'mc', text: 'Monaco', icon: 'mc flag' },
        { value: 'mn', text: 'Mongolia', icon: 'mn flag' },
        { value: 'me', text: 'Montenegro', icon: 'me flag' },
        { value: 'ms', text: 'Montserrat', icon: 'ms flag' },
        { value: 'ma', text: 'Morocco', icon: 'ma flag' },
        { value: 'mz', text: 'Mozambique', icon: 'mz flag' },
        { value: 'na', text: 'Namibia', icon: 'na flag' },
        { value: 'nr', text: 'Nauru', icon: 'nr flag' },
        { value: 'np', text: 'Nepal', icon: 'np flag' },
        { value: 'an', text: 'Netherlands Antilles', icon: 'an flag' },
        { value: 'nl', text: 'Netherlands', icon: 'nl flag' },
        { value: 'nc', text: 'New Caledonia', icon: 'nc flag' },
        { value: 'pg', text: 'New Guinea', icon: 'pg flag' },
        { value: 'nz', text: 'New Zealand', icon: 'nz flag' },
        { value: 'ni', text: 'Nicaragua', icon: 'ni flag' },
        { value: 'ne', text: 'Niger', icon: 'ne flag' },
        { value: 'ng', text: 'Nigeria', icon: 'ng flag' },
        { value: 'nu', text: 'Niue', icon: 'nu flag' },
        { value: 'nf', text: 'Norfolk Island', icon: 'nf flag' },
        { value: 'kp', text: 'North Korea', icon: 'kp flag' },
        { value: 'mp', text: 'Northern Mariana Islands', icon: 'mp flag' },
        { value: 'no', text: 'Norway', icon: 'no flag' },
        { value: 'om', text: 'Oman', icon: 'om flag' },
        { value: 'pk', text: 'Pakistan', icon: 'pk flag' },
        { value: 'pw', text: 'Palau', icon: 'pw flag' },
        { value: 'ps', text: 'Palestine', icon: 'ps flag' },
        { value: 'pa', text: 'Panama', icon: 'pa flag' },
        { value: 'py', text: 'Paraguay', icon: 'py flag' },
        { value: 'pe', text: 'Peru', icon: 'pe flag' },
        { value: 'ph', text: 'Philippines', icon: 'ph flag' },
        { value: 'pn', text: 'Pitcairn Islands', icon: 'pn flag' },
        { value: 'pl', text: 'Poland', icon: 'pl flag' },
        { value: 'pt', text: 'Portugal', icon: 'pt flag' },
        { value: 'pr', text: 'Puerto Rico', icon: 'pr flag' },
        { value: 'qa', text: 'Qatar', icon: 'qa flag' },
        { value: 're', text: 'Reunion', icon: 're flag' },
        { value: 'ro', text: 'Romania', icon: 'ro flag' },
        { value: 'ru', text: 'Russia', icon: 'ru flag' },
        { value: 'rw', text: 'Rwanda', icon: 'rw flag' },
        { value: 'sh', text: 'Saint Helena', icon: 'sh flag' },
        { value: 'kn', text: 'Saint Kitts and Nevis', icon: 'kn flag' },
        { value: 'lc', text: 'Saint Lucia', icon: 'lc flag' },
        { value: 'pm', text: 'Saint Pierre', icon: 'pm flag' },
        { value: 'vc', text: 'Saint Vincent', icon: 'vc flag' },
        { value: 'ws', text: 'Samoa', icon: 'ws flag' },
        { value: 'sm', text: 'San Marino', icon: 'sm flag' },
        { value: 'gs', text: 'Sandwich Islands', icon: 'gs flag' },
        { value: 'st', text: 'Sao Tome', icon: 'st flag' },
        { value: 'sa', text: 'Saudi Arabia', icon: 'sa flag' },
        { value: 'sn', text: 'Senegal', icon: 'sn flag' },
        { value: 'cs', text: 'Serbia', icon: 'cs flag' },
        { value: 'rs', text: 'Serbia', icon: 'rs flag' },
        { value: 'sc', text: 'Seychelles', icon: 'sc flag' },
        { value: 'sl', text: 'Sierra Leone', icon: 'sl flag' },
        { value: 'sg', text: 'Singapore', icon: 'sg flag' },
        { value: 'sk', text: 'Slovakia', icon: 'sk flag' },
        { value: 'si', text: 'Slovenia', icon: 'si flag' },
        { value: 'sb', text: 'Solomon Islands', icon: 'sb flag' },
        { value: 'so', text: 'Somalia', icon: 'so flag' },
        { value: 'za', text: 'South Africa', icon: 'za flag' },
        { value: 'kr', text: 'South Korea', icon: 'kr flag' },
        { value: 'es', text: 'Spain', icon: 'es flag' },
        { value: 'lk', text: 'Sri Lanka', icon: 'lk flag' },
        { value: 'sd', text: 'Sudan', icon: 'sd flag' },
        { value: 'sr', text: 'Suriname', icon: 'sr flag' },
        { value: 'sj', text: 'Svalbard', icon: 'sj flag' },
        { value: 'sz', text: 'Swaziland', icon: 'sz flag' },
        { value: 'se', text: 'Sweden', icon: 'se flag' },
        { value: 'ch', text: 'Switzerland', icon: 'ch flag' },
        { value: 'sy', text: 'Syria', icon: 'sy flag' },
        { value: 'tw', text: 'Taiwan', icon: 'tw flag' },
        { value: 'tj', text: 'Tajikistan', icon: 'tj flag' },
        { value: 'tz', text: 'Tanzania', icon: 'tz flag' },
        { value: 'th', text: 'Thailand', icon: 'th flag' },
        { value: 'tl', text: 'Timorleste', icon: 'tl flag' },
        { value: 'tg', text: 'Togo', icon: 'tg flag' },
        { value: 'tk', text: 'Tokelau', icon: 'tk flag' },
        { value: 'to', text: 'Tonga', icon: 'to flag' },
        { value: 'tt', text: 'Trinidad', icon: 'tt flag' },
        { value: 'tn', text: 'Tunisia', icon: 'tn flag' },
        { value: 'tr', text: 'Turkey', icon: 'tr flag' },
        { value: 'tm', text: 'Turkmenistan', icon: 'tm flag' },
        { value: 'tv', text: 'Tuvalu', icon: 'tv flag' },
        { value: 'ug', text: 'Uganda', icon: 'ug flag' },
        { value: 'ua', text: 'Ukraine', icon: 'ua flag' },
        { value: 'ae', text: 'United Arab Emirates', icon: 'ae flag' },
        { value: 'us', text: 'United States', icon: 'us flag' },
        { value: 'uy', text: 'Uruguay', icon: 'uy flag' },
        { value: 'um', text: 'Us Minor Islands', icon: 'um flag' },
        { value: 'vi', text: 'Us Virgin Islands', icon: 'vi flag' },
        { value: 'uz', text: 'Uzbekistan', icon: 'uz flag' },
        { value: 'vu', text: 'Vanuatu', icon: 'vu flag' },
        { value: 'va', text: 'Vatican City', icon: 'va flag' },
        { value: 've', text: 'Venezuela', icon: 've flag' },
        { value: 'vn', text: 'Vietnam', icon: 'vn flag' },
        { value: 'wf', text: 'Wallis and Futuna', icon: 'wf flag' },
        { value: 'eh', text: 'Western Sahara', icon: 'eh flag' },
        { value: 'ye', text: 'Yemen', icon: 'ye flag' },
        { value: 'zm', text: 'Zambia', icon: 'zm flag' },
        { value: 'zw', text: 'Zimbabwe', icon: 'zw flag' }
    ];

    public static readonly states: DropdownValue<string>[] = [
        { value: 'AL', text: 'Alabama' },
        { value: 'AK', text: 'Alaska' },
        { value: 'AZ', text: 'Arizona' },
        { value: 'AR', text: 'Arkansas' },
        { value: 'CA', text: 'California' },
        { value: 'CO', text: 'Colorado' },
        { value: 'CT', text: 'Connecticut' },
        { value: 'DE', text: 'Delaware' },
        { value: 'DC', text: 'District Of Columbia' },
        { value: 'FL', text: 'Florida' },
        { value: 'GA', text: 'Georgia' },
        { value: 'HI', text: 'Hawaii' },
        { value: 'ID', text: 'Idaho' },
        { value: 'IL', text: 'Illinois' },
        { value: 'IN', text: 'Indiana' },
        { value: 'IA', text: 'Iowa' },
        { value: 'KS', text: 'Kansas' },
        { value: 'KY', text: 'Kentucky' },
        { value: 'LA', text: 'Louisiana' },
        { value: 'ME', text: 'Maine' },
        { value: 'MD', text: 'Maryland' },
        { value: 'MA', text: 'Massachusetts' },
        { value: 'MI', text: 'Michigan' },
        { value: 'MN', text: 'Minnesota' },
        { value: 'MS', text: 'Mississippi' },
        { value: 'MO', text: 'Missouri' },
        { value: 'MT', text: 'Montana' },
        { value: 'NE', text: 'Nebraska' },
        { value: 'NV', text: 'Nevada' },
        { value: 'NH', text: 'New Hampshire' },
        { value: 'NJ', text: 'New Jersey' },
        { value: 'NM', text: 'New Mexico' },
        { value: 'NY', text: 'New York' },
        { value: 'NC', text: 'North Carolina' },
        { value: 'ND', text: 'North Dakota' },
        { value: 'OH', text: 'Ohio' },
        { value: 'OK', text: 'Oklahoma' },
        { value: 'OR', text: 'Oregon' },
        { value: 'PA', text: 'Pennsylvania' },
        { value: 'RI', text: 'Rhode Island' },
        { value: 'SC', text: 'South Carolina' },
        { value: 'SD', text: 'South Dakota' },
        { value: 'TN', text: 'Tennessee' },
        { value: 'TX', text: 'Texas' },
        { value: 'UT', text: 'Utah' },
        { value: 'VT', text: 'Vermont' },
        { value: 'VA', text: 'Virginia' },
        { value: 'WA', text: 'Washington' },
        { value: 'WV', text: 'West Virginia' },
        { value: 'WI', text: 'Wisconsin' },
        { value: 'WY', text: 'Wyoming' }
    ];
}
