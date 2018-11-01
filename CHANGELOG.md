## 2.0.0 (November 1, 2018)

* Breaking Change: Removed Processor namespace from main interface.  You have to now directly import required methods.
  - Good: `import * as Processor from "@bluemarblepayroll/stringent";`
  - Good: `import { evaluate } from '@bluemarblepayroll/stringent';`
  - Bad: `import { Processor } from "@bluemarblepayroll/stringent";`
