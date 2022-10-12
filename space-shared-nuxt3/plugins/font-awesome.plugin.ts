import { defineComponent, h, PropType } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { TIndexedObject } from '@/types'

import {
  faTwitterSquare as fabTwitterSquare,
  faLinkedin as fabLinkedInSquare,
  faFacebookSquare as fabFacebookSquare,
  faTelegramPlane as fabTelegramPlane,
  faSearchengin as fabSearchengin
} from '@fortawesome/free-brands-svg-icons'

import {
  faBookmark as farBookmark,
  faCheckCircle as farCheckCircle,
  faCheckSquare as farCheckSquare,
  faCommentAlt as farCommentAlt,
  faAddressCard as farAddressCard,
  faCalendarPlus as farCalendarPlus,
  faBuilding as farBuilding,
  faCalendarAlt as farCalendarAlt,
  faUserCircle as farUserCircle,
  faFileArchive as farFileArchive,
  faFileAudio as farFileAudio,
  faFileImage as farFileImage,
  faFileExcel as farFileExcel,
  faFileWord as farFileWord,
  faFilePdf as farFilePdf,
  faFileVideo as farFileVideo,
} from '@fortawesome/free-regular-svg-icons'

import {
  faMapMarked as fasMapMarked,
  faBuilding as fasBuilding,
  faHome as fasHome,
  faBroom as fasBroom,
  faMoneyBill as fasMoneyBill,
  faBriefcase as fasBriefcase,
  faAddressBook as fasAddressBook,
  faRunning as fasRunning,
  faMobile as fasMobile,
  faEnvelope as fasEnvelop,
  faPlay as fasPlay,
  faCheckCircle as fasCheckCircle,
  faFileEdit as fasFileEdit,
  faCopy as fasCopy,
  faHistory as fasHistory,
  faFileSignature as fasFileSignature,
  faArrowUp as fasArrowUp,
  faArrowDown as fasArrowDown,
  faLock as fasLock,
  faInfoCircle as fasInfoCircle,
  faExchangeAlt as fasExchangeAlt,
  faSync as fasSync,
  faUserCog as fasUserCog,
  faCaretDown as fasCaretDown,
  faChevronRight as fasChevronRight,
  faChevronLeft as fasChevronLeft,
  faEye as fasEye,
  faFolder as fasFolder,
  faFolderOpen as fasFolderOpen,
  faUserFriends as fasUserFriends,
  faUsers as fasUsers,
  faBan as fasBan,
  faCheck as fasCheck,
  faHourglassHalf as farHourglassHalf,
  faDownload as fasDownload,
  faExclamation as fasExclamation,
  faFilter as fasFilter,
  faForward as fasForward,
  faKey as fasKey,
  faPencilAlt as fasPencilAlt,
  faPlus as fasPlus,
  faUndo as fasUndo,
  faRedo as fasRedo,
  faMinus as fasMinus,
  faQuestionCircle as fasQuestionCircle,
  faRedoAlt as fasRedoAlt,
  faSave as fasSave,
  faSearch as fasSearch,
  faSignOut as fasSignOut,
  faTimes as fasTimes,
  faTrash as fasTrash,
  faUpload as fasUpload,
  faUserCircle as fasUserCircle,
  faUserEdit as fasUserEdit,
  faUserPlus as fasUserPlus,
  faGripVertical as fasGripVertical, // drag icon
  faArrowsAlt as fasArrowsAlt,
  faPaperclip as fasPaperClip,
  faHandPointRight as fasHandPointRight,
  faThumbsUp as fasThumbsUp,
  faThumbsDown as fasThumbsDown,
  faChartLine as fasChartLine,
  faPaperPlane as fasPaperPlane,
  faChalkboardTeacher as fasChalkboardTeacher,
  faClone as fasClone,
  faPenSquare as fasPenSquare,
  faNotesMedical as fasNotesMedical,
  faChalkboard as fasChalkboard
} from '@fortawesome/free-solid-svg-icons'

const FontAwesomeIconsList = {
  fabTwitterSquare,
  fabLinkedInSquare,
  fabFacebookSquare,
  fabTelegramPlane,
  fabSearchengin,

  farHourglassHalf,
  fasPenSquare,
  fasBroom,
  fasMoneyBill,
  fasBriefcase,
  fasAddressBook,
  fasRunning,
  fasMobile,
  fasNotesMedical,
  fasChalkboard,
  fasBuilding,
fasMapMarked,

  farBookmark,
  farCheckCircle,
  farCheckSquare,
  farCommentAlt,
  farAddressCard,
  farCalendarPlus,
  farBuilding,
  farCalendarAlt,
  farUserCircle,
  farFileArchive,
  farFileAudio,
  farFileImage,
  farFileExcel,
  farFileWord,
  farFilePdf,
  farFileVideo,

  fasHome,
  fasChalkboardTeacher,
  fasPlay,
  fasCheckCircle,
  fasFileEdit,
  fasCopy,
  fasHistory,
  fasFileSignature,
  fasArrowUp,
  fasArrowDown,
  fasLock,
  fasInfoCircle,
  fasExchangeAlt,
  fasSync,
  fasUserCog,
  fasEnvelop,
  fasCaretDown,
  fasChevronRight,
  fasChevronLeft,
  fasEye,
  fasFolder,
  fasFolderOpen,
  fasUserFriends,
  fasUsers,
  fasBan,
  fasCheck,
  fasDownload,
  fasExclamation,
  fasFilter,
  fasForward,
  fasKey,
  fasPencilAlt,
  fasPlus,
  fasUndo,
  fasRedo,
  fasMinus,
  fasQuestionCircle,
  fasRedoAlt,
  fasSave,
  fasSearch,
  fasSignOut,
  fasTimes,
  fasTrash,
  fasUpload,
  fasUserCircle,
  fasUserEdit,
  fasUserPlus,
  fasGripVertical,
  fasArrowsAlt,
  fasPaperClip,
  fasHandPointRight,
  fasThumbsUp,
  fasThumbsDown,
  fasChartLine,
  fasPaperPlane,
  fasClone
}

for (const key in FontAwesomeIconsList) {
  library.add((FontAwesomeIconsList as TIndexedObject<IconDefinition>)[key])
}

const IconComponent = defineComponent({
  name: 'Icon',
  props: {
    name: Object as PropType<IconDefinition | [IconDefinition, boolean][]>
  },
  render () {
    if (this.name) {
      if (Array.isArray(this.name)) {
        const iconToRender = this.name.find(([, key]) => key)
        return iconToRender ? h(FontAwesomeIcon, { icon: iconToRender[0] }) : null
      } else {
        return h(FontAwesomeIcon, { icon: this.name })
      }
    } else {
      return null
    }
  }
})

export default defineNuxtPlugin((_nuxt) => {
  _nuxt.vueApp.component(IconComponent.name, IconComponent)
  return {
    provide: {
      icons: FontAwesomeIconsList
    }
  }
})

export { FontAwesomeIconsList }
