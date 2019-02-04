
var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "한국어",
  title: "브로코리",
  blocks: "블럭",
  /* Menu */
  open: "불러오기",
  save: "저장하기",
  deleteAll: "삭제하기",
  settings: "설정하기",
  documentation: "매뉴얼",
  reportBug: "오류신고",
  examples: "예제",
  /* Settings */
  compilerLocation: "컴파일러 위치(arduino)",
  compilerLocationDefault: "컴파일러 위치를 설정해 주세요",
  sketchFolder: "스케치 폴더",
  sketchFolderDefault: "스케치 폴더 인식불가",
  arduinoBoard: "아두이노 보드",
  arduinoBoardDefault: "아두이노 보드를 모릅니다",
  comPort: "COM Port",
  comPortDefault: "COM Port 인식 못함",
  defaultIdeButton: "기본 IDE 버튼",
  defaultIdeButtonDefault: "IDE 옵션 모름",
  language: "언어",
  languageDefault: "언어를 모름",
  sketchName: "스케치 이름",
  /* Arduino console output */
  arduinoOpMainTitle: "Arduino IDE 출력",
  arduinoOpWaiting: "Waiting for the IDE output...",
  arduinoOpUploadedTitle: "업로드 ",
  arduinoOpVerifiedTitle: "스케치 확인",
  arduinoOpOpenedTitle: "아두이노 IDE를 실행합니다.",
  arduinoOpOpenedBody: "해당 스케치를  Arduino IDE로  열었습니다 ",
  arduinoOpErrorTitle: "에러가 있습니다",
  arduinoOpErrorIdContext_0: "에러 없음",
  arduinoOpErrorIdContext_1: "빌드또는 업로드실패",
  arduinoOpErrorIdContext_2: "스케치화일을 찾을수 없음.",
  arduinoOpErrorIdContext_3: "잘못된 커맨드라인 명령입니다.",
  arduinoOpErrorIdContext_4: "Preference passed to 'get-pref' flag does not exist.",
  arduinoOpErrorIdContext_5: "Not Clear, but Arduino IDE sometimes errors with this.",
  arduinoOpErrorIdContext_50: "Unexpected error code from Arduino IDE",
  arduinoOpErrorIdContext_51: "스케치 화일을 만들수 없습니다",
  arduinoOpErrorIdContext_52: "내부적으로 생성된 스케치 화일의 잘못된 경로 입니다",
  arduinoOpErrorIdContext_53: "Arduino IDE 찾을수 없습니다<br>" +
                              "컴파일러 디렉토리가 잘못지정되어 있습니다.<br>" +
                              "편집-> 설정에서 arduino.exe 경로를 다시 확인해 주시기 바랍니다",
  arduinoOpErrorIdContext_54: "What should we do with the Sketch?<br>" +
                              "The launch IDE option has not been set.<br>" +
                              "Please select an IDE option in the Settings.",
  arduinoOpErrorIdContext_55: "시리얼 포트를 사용할수 없습니다<br>" +
                              "시리얼 포트를 찾을수 없습니다<br>" +
                              "PC에 아두이노가 정확히 연결되어 있다면 시리얼포트 셋팅을 확인해 주시기 바랍니다",
  arduinoOpErrorIdContext_56: "알수 없는 아두이노 보드입니다<br>" +
                              "해당 아두이노 보드가 셋팅되어 있지 않습니다.<br>" +
                              "셋팅에서 정확한 아두이노 보드를 선택해주세요",
  arduinoOpErrorIdContext_52: "Unexpected server error.",
  arduinoOpErrorIdContext_64: "Unable to parse sent JSON.",
  arduinoOpErrorUnknown: "Unexpected error",
  /* Modals */
  noServerTitle: "Blockoli app not running",
  noServerTitleBody: "<p>For all the Blockoli features to be enabled, the Blockoli desktop application must be running locally on your computer.</p>" +
                     "<p>If you are using an online version you will not be able to configure the settings nor load the blocks code into an Arduino.</p>" +
                     "<p>Installation instruction can be found in the <a href=\"https://github.com/carlosperate/Blockoli\">Blockoli repository</a>.</p>" +
                     "<p>If you have Blockoli already installed, make sure the application is running correctly.</p>",
  noServerNoLangBody: "If the Blockoli application is not running the language cannot be fully changed.",
  addBlocksTitle: "Additional Blocks",
  /* Alerts */
  loadNewBlocksTitle: "새로운 블럭을 로드할까요?",
  loadNewBlocksBody: "새 XML 파일을로드하면 작업 영역의 현재 블록이 대체됩니다.<br>" +
                     "계속 진행할까요?",
  discardBlocksTitle: "블럭을 지울까요?",
  discardBlocksBody: "작업공간에 %1 개의 블럭이 있습니다.<br>" +
                     "삭제 하시겠습니까?",
  invalidXmlTitle: "맞지않는 XML입니다",
  invalidXmlBody: "XML 파일이 블록으로 성공적으로 파싱되지 않았습니다. XML 코드를 검토하고 다시 시도하십시오.",
  /* Tooltips */
  uploadingSketch: "스케치를 아두이노에 업로드 하고 있습니다...",
  uploadSketch: "아두이노에 업로드",
  verifyingSketch: "스케치를 확인하고 있습니다...",
  verifySketch: "스케치가 확인/컴파일",
  openingSketch: "스케치를 Arduino IDE에 열고 있습니다",
  openSketch: "스케치를 아두이노  IDE로 오픈",
  notImplemented: "기능이 아직 구현되지 않았습니다.",
  /* Prompts */
  ok: "확인",
  okay: "확인",
  cancel: "취소",
  return: "되돌아가기",
  /* Cards */
  arduinoSourceCode: "Arduino Source Code",
  blocksXml: "Blocks XML",
  /* Toolbox Categories*/
  catLogic: "논리",

  catLoops: "반 복",
  catMath: "수 학",
  catText: "문자열",
  catVariables: "변 수",
  catFunctions: "함 수",
  catInputOutput: "입출력",
  catTime: "시 간",
  catAudio: "소 리",
  catMotors: "액츄에이터",
  catComms: "통 신",
  catsens: "센 서",

};
