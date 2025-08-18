
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model credentials
 * 
 */
export type credentials = $Result.DefaultSelection<Prisma.$credentialsPayload>
/**
 * Model sessions
 * 
 */
export type sessions = $Result.DefaultSelection<Prisma.$sessionsPayload>
/**
 * Model profiles
 * 
 */
export type profiles = $Result.DefaultSelection<Prisma.$profilesPayload>
/**
 * Model traits
 * 
 */
export type traits = $Result.DefaultSelection<Prisma.$traitsPayload>
/**
 * Model sources
 * 
 */
export type sources = $Result.DefaultSelection<Prisma.$sourcesPayload>
/**
 * Model messages
 * 
 */
export type messages = $Result.DefaultSelection<Prisma.$messagesPayload>
/**
 * Model embeddings
 * 
 */
export type embeddings = $Result.DefaultSelection<Prisma.$embeddingsPayload>
/**
 * Model voice_profiles
 * 
 */
export type voice_profiles = $Result.DefaultSelection<Prisma.$voice_profilesPayload>
/**
 * Model embedding_jobs
 * 
 */
export type embedding_jobs = $Result.DefaultSelection<Prisma.$embedding_jobsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SourceType: {
  survey: 'survey',
  chat: 'chat',
  file: 'file',
  link: 'link'
};

export type SourceType = (typeof SourceType)[keyof typeof SourceType]


export const RoleType: {
  system: 'system',
  user: 'user',
  assistant: 'assistant'
};

export type RoleType = (typeof RoleType)[keyof typeof RoleType]

}

export type SourceType = $Enums.SourceType

export const SourceType: typeof $Enums.SourceType

export type RoleType = $Enums.RoleType

export const RoleType: typeof $Enums.RoleType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.credentials`: Exposes CRUD operations for the **credentials** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Credentials
    * const credentials = await prisma.credentials.findMany()
    * ```
    */
  get credentials(): Prisma.credentialsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sessions`: Exposes CRUD operations for the **sessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.sessions.findMany()
    * ```
    */
  get sessions(): Prisma.sessionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profiles`: Exposes CRUD operations for the **profiles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profiles.findMany()
    * ```
    */
  get profiles(): Prisma.profilesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.traits`: Exposes CRUD operations for the **traits** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Traits
    * const traits = await prisma.traits.findMany()
    * ```
    */
  get traits(): Prisma.traitsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sources`: Exposes CRUD operations for the **sources** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sources
    * const sources = await prisma.sources.findMany()
    * ```
    */
  get sources(): Prisma.sourcesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messages`: Exposes CRUD operations for the **messages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.messages.findMany()
    * ```
    */
  get messages(): Prisma.messagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.embeddings`: Exposes CRUD operations for the **embeddings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Embeddings
    * const embeddings = await prisma.embeddings.findMany()
    * ```
    */
  get embeddings(): Prisma.embeddingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.voice_profiles`: Exposes CRUD operations for the **voice_profiles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Voice_profiles
    * const voice_profiles = await prisma.voice_profiles.findMany()
    * ```
    */
  get voice_profiles(): Prisma.voice_profilesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.embedding_jobs`: Exposes CRUD operations for the **embedding_jobs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Embedding_jobs
    * const embedding_jobs = await prisma.embedding_jobs.findMany()
    * ```
    */
  get embedding_jobs(): Prisma.embedding_jobsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    credentials: 'credentials',
    sessions: 'sessions',
    profiles: 'profiles',
    traits: 'traits',
    sources: 'sources',
    messages: 'messages',
    embeddings: 'embeddings',
    voice_profiles: 'voice_profiles',
    embedding_jobs: 'embedding_jobs'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "credentials" | "sessions" | "profiles" | "traits" | "sources" | "messages" | "embeddings" | "voice_profiles" | "embedding_jobs"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      credentials: {
        payload: Prisma.$credentialsPayload<ExtArgs>
        fields: Prisma.credentialsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.credentialsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.credentialsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload>
          }
          findFirst: {
            args: Prisma.credentialsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.credentialsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload>
          }
          findMany: {
            args: Prisma.credentialsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload>[]
          }
          create: {
            args: Prisma.credentialsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload>
          }
          createMany: {
            args: Prisma.credentialsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.credentialsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload>[]
          }
          delete: {
            args: Prisma.credentialsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload>
          }
          update: {
            args: Prisma.credentialsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload>
          }
          deleteMany: {
            args: Prisma.credentialsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.credentialsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.credentialsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload>[]
          }
          upsert: {
            args: Prisma.credentialsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credentialsPayload>
          }
          aggregate: {
            args: Prisma.CredentialsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCredentials>
          }
          groupBy: {
            args: Prisma.credentialsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CredentialsGroupByOutputType>[]
          }
          count: {
            args: Prisma.credentialsCountArgs<ExtArgs>
            result: $Utils.Optional<CredentialsCountAggregateOutputType> | number
          }
        }
      }
      sessions: {
        payload: Prisma.$sessionsPayload<ExtArgs>
        fields: Prisma.sessionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sessionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sessionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload>
          }
          findFirst: {
            args: Prisma.sessionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sessionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload>
          }
          findMany: {
            args: Prisma.sessionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload>[]
          }
          create: {
            args: Prisma.sessionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload>
          }
          createMany: {
            args: Prisma.sessionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sessionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload>[]
          }
          delete: {
            args: Prisma.sessionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload>
          }
          update: {
            args: Prisma.sessionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload>
          }
          deleteMany: {
            args: Prisma.sessionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sessionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sessionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload>[]
          }
          upsert: {
            args: Prisma.sessionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionsPayload>
          }
          aggregate: {
            args: Prisma.SessionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSessions>
          }
          groupBy: {
            args: Prisma.sessionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.sessionsCountArgs<ExtArgs>
            result: $Utils.Optional<SessionsCountAggregateOutputType> | number
          }
        }
      }
      profiles: {
        payload: Prisma.$profilesPayload<ExtArgs>
        fields: Prisma.profilesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.profilesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.profilesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload>
          }
          findFirst: {
            args: Prisma.profilesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.profilesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload>
          }
          findMany: {
            args: Prisma.profilesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload>[]
          }
          create: {
            args: Prisma.profilesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload>
          }
          createMany: {
            args: Prisma.profilesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.profilesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload>[]
          }
          delete: {
            args: Prisma.profilesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload>
          }
          update: {
            args: Prisma.profilesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload>
          }
          deleteMany: {
            args: Prisma.profilesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.profilesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.profilesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload>[]
          }
          upsert: {
            args: Prisma.profilesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilesPayload>
          }
          aggregate: {
            args: Prisma.ProfilesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfiles>
          }
          groupBy: {
            args: Prisma.profilesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfilesGroupByOutputType>[]
          }
          count: {
            args: Prisma.profilesCountArgs<ExtArgs>
            result: $Utils.Optional<ProfilesCountAggregateOutputType> | number
          }
        }
      }
      traits: {
        payload: Prisma.$traitsPayload<ExtArgs>
        fields: Prisma.traitsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.traitsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.traitsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload>
          }
          findFirst: {
            args: Prisma.traitsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.traitsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload>
          }
          findMany: {
            args: Prisma.traitsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload>[]
          }
          create: {
            args: Prisma.traitsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload>
          }
          createMany: {
            args: Prisma.traitsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.traitsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload>[]
          }
          delete: {
            args: Prisma.traitsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload>
          }
          update: {
            args: Prisma.traitsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload>
          }
          deleteMany: {
            args: Prisma.traitsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.traitsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.traitsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload>[]
          }
          upsert: {
            args: Prisma.traitsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$traitsPayload>
          }
          aggregate: {
            args: Prisma.TraitsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTraits>
          }
          groupBy: {
            args: Prisma.traitsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TraitsGroupByOutputType>[]
          }
          count: {
            args: Prisma.traitsCountArgs<ExtArgs>
            result: $Utils.Optional<TraitsCountAggregateOutputType> | number
          }
        }
      }
      sources: {
        payload: Prisma.$sourcesPayload<ExtArgs>
        fields: Prisma.sourcesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sourcesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sourcesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload>
          }
          findFirst: {
            args: Prisma.sourcesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sourcesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload>
          }
          findMany: {
            args: Prisma.sourcesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload>[]
          }
          create: {
            args: Prisma.sourcesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload>
          }
          createMany: {
            args: Prisma.sourcesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sourcesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload>[]
          }
          delete: {
            args: Prisma.sourcesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload>
          }
          update: {
            args: Prisma.sourcesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload>
          }
          deleteMany: {
            args: Prisma.sourcesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sourcesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sourcesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload>[]
          }
          upsert: {
            args: Prisma.sourcesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sourcesPayload>
          }
          aggregate: {
            args: Prisma.SourcesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSources>
          }
          groupBy: {
            args: Prisma.sourcesGroupByArgs<ExtArgs>
            result: $Utils.Optional<SourcesGroupByOutputType>[]
          }
          count: {
            args: Prisma.sourcesCountArgs<ExtArgs>
            result: $Utils.Optional<SourcesCountAggregateOutputType> | number
          }
        }
      }
      messages: {
        payload: Prisma.$messagesPayload<ExtArgs>
        fields: Prisma.messagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.messagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.messagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          findFirst: {
            args: Prisma.messagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.messagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          findMany: {
            args: Prisma.messagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>[]
          }
          create: {
            args: Prisma.messagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          createMany: {
            args: Prisma.messagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.messagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>[]
          }
          delete: {
            args: Prisma.messagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          update: {
            args: Prisma.messagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          deleteMany: {
            args: Prisma.messagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.messagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.messagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>[]
          }
          upsert: {
            args: Prisma.messagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          aggregate: {
            args: Prisma.MessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessages>
          }
          groupBy: {
            args: Prisma.messagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.messagesCountArgs<ExtArgs>
            result: $Utils.Optional<MessagesCountAggregateOutputType> | number
          }
        }
      }
      embeddings: {
        payload: Prisma.$embeddingsPayload<ExtArgs>
        fields: Prisma.embeddingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.embeddingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.embeddingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload>
          }
          findFirst: {
            args: Prisma.embeddingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.embeddingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload>
          }
          findMany: {
            args: Prisma.embeddingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload>[]
          }
          create: {
            args: Prisma.embeddingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload>
          }
          createMany: {
            args: Prisma.embeddingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.embeddingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload>[]
          }
          delete: {
            args: Prisma.embeddingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload>
          }
          update: {
            args: Prisma.embeddingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload>
          }
          deleteMany: {
            args: Prisma.embeddingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.embeddingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.embeddingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload>[]
          }
          upsert: {
            args: Prisma.embeddingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embeddingsPayload>
          }
          aggregate: {
            args: Prisma.EmbeddingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmbeddings>
          }
          groupBy: {
            args: Prisma.embeddingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.embeddingsCountArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingsCountAggregateOutputType> | number
          }
        }
      }
      voice_profiles: {
        payload: Prisma.$voice_profilesPayload<ExtArgs>
        fields: Prisma.voice_profilesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.voice_profilesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.voice_profilesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload>
          }
          findFirst: {
            args: Prisma.voice_profilesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.voice_profilesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload>
          }
          findMany: {
            args: Prisma.voice_profilesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload>[]
          }
          create: {
            args: Prisma.voice_profilesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload>
          }
          createMany: {
            args: Prisma.voice_profilesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.voice_profilesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload>[]
          }
          delete: {
            args: Prisma.voice_profilesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload>
          }
          update: {
            args: Prisma.voice_profilesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload>
          }
          deleteMany: {
            args: Prisma.voice_profilesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.voice_profilesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.voice_profilesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload>[]
          }
          upsert: {
            args: Prisma.voice_profilesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$voice_profilesPayload>
          }
          aggregate: {
            args: Prisma.Voice_profilesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoice_profiles>
          }
          groupBy: {
            args: Prisma.voice_profilesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Voice_profilesGroupByOutputType>[]
          }
          count: {
            args: Prisma.voice_profilesCountArgs<ExtArgs>
            result: $Utils.Optional<Voice_profilesCountAggregateOutputType> | number
          }
        }
      }
      embedding_jobs: {
        payload: Prisma.$embedding_jobsPayload<ExtArgs>
        fields: Prisma.embedding_jobsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.embedding_jobsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.embedding_jobsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload>
          }
          findFirst: {
            args: Prisma.embedding_jobsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.embedding_jobsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload>
          }
          findMany: {
            args: Prisma.embedding_jobsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload>[]
          }
          create: {
            args: Prisma.embedding_jobsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload>
          }
          createMany: {
            args: Prisma.embedding_jobsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.embedding_jobsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload>[]
          }
          delete: {
            args: Prisma.embedding_jobsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload>
          }
          update: {
            args: Prisma.embedding_jobsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload>
          }
          deleteMany: {
            args: Prisma.embedding_jobsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.embedding_jobsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.embedding_jobsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload>[]
          }
          upsert: {
            args: Prisma.embedding_jobsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$embedding_jobsPayload>
          }
          aggregate: {
            args: Prisma.Embedding_jobsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmbedding_jobs>
          }
          groupBy: {
            args: Prisma.embedding_jobsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Embedding_jobsGroupByOutputType>[]
          }
          count: {
            args: Prisma.embedding_jobsCountArgs<ExtArgs>
            result: $Utils.Optional<Embedding_jobsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    credentials?: credentialsOmit
    sessions?: sessionsOmit
    profiles?: profilesOmit
    traits?: traitsOmit
    sources?: sourcesOmit
    messages?: messagesOmit
    embeddings?: embeddingsOmit
    voice_profiles?: voice_profilesOmit
    embedding_jobs?: embedding_jobsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    credentials: number
    sessions: number
    traits: number
    sources: number
    messages: number
    voice_profiles: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    credentials?: boolean | UsersCountOutputTypeCountCredentialsArgs
    sessions?: boolean | UsersCountOutputTypeCountSessionsArgs
    traits?: boolean | UsersCountOutputTypeCountTraitsArgs
    sources?: boolean | UsersCountOutputTypeCountSourcesArgs
    messages?: boolean | UsersCountOutputTypeCountMessagesArgs
    voice_profiles?: boolean | UsersCountOutputTypeCountVoice_profilesArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: credentialsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessionsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTraitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: traitsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sourcesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: messagesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountVoice_profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: voice_profilesWhereInput
  }


  /**
   * Count Type SourcesCountOutputType
   */

  export type SourcesCountOutputType = {
    traits: number
    embeddings: number
  }

  export type SourcesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    traits?: boolean | SourcesCountOutputTypeCountTraitsArgs
    embeddings?: boolean | SourcesCountOutputTypeCountEmbeddingsArgs
  }

  // Custom InputTypes
  /**
   * SourcesCountOutputType without action
   */
  export type SourcesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourcesCountOutputType
     */
    select?: SourcesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SourcesCountOutputType without action
   */
  export type SourcesCountOutputTypeCountTraitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: traitsWhereInput
  }

  /**
   * SourcesCountOutputType without action
   */
  export type SourcesCountOutputTypeCountEmbeddingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: embeddingsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    email: string | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    email: string | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    created_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    email: string
    created_at: Date
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    created_at?: boolean
    credentials?: boolean | users$credentialsArgs<ExtArgs>
    sessions?: boolean | users$sessionsArgs<ExtArgs>
    profiles?: boolean | users$profilesArgs<ExtArgs>
    traits?: boolean | users$traitsArgs<ExtArgs>
    sources?: boolean | users$sourcesArgs<ExtArgs>
    messages?: boolean | users$messagesArgs<ExtArgs>
    voice_profiles?: boolean | users$voice_profilesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    credentials?: boolean | users$credentialsArgs<ExtArgs>
    sessions?: boolean | users$sessionsArgs<ExtArgs>
    profiles?: boolean | users$profilesArgs<ExtArgs>
    traits?: boolean | users$traitsArgs<ExtArgs>
    sources?: boolean | users$sourcesArgs<ExtArgs>
    messages?: boolean | users$messagesArgs<ExtArgs>
    voice_profiles?: boolean | users$voice_profilesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      credentials: Prisma.$credentialsPayload<ExtArgs>[]
      sessions: Prisma.$sessionsPayload<ExtArgs>[]
      profiles: Prisma.$profilesPayload<ExtArgs> | null
      traits: Prisma.$traitsPayload<ExtArgs>[]
      sources: Prisma.$sourcesPayload<ExtArgs>[]
      messages: Prisma.$messagesPayload<ExtArgs>[]
      voice_profiles: Prisma.$voice_profilesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      created_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    credentials<T extends users$credentialsArgs<ExtArgs> = {}>(args?: Subset<T, users$credentialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends users$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, users$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    profiles<T extends users$profilesArgs<ExtArgs> = {}>(args?: Subset<T, users$profilesArgs<ExtArgs>>): Prisma__profilesClient<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    traits<T extends users$traitsArgs<ExtArgs> = {}>(args?: Subset<T, users$traitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sources<T extends users$sourcesArgs<ExtArgs> = {}>(args?: Subset<T, users$sourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends users$messagesArgs<ExtArgs> = {}>(args?: Subset<T, users$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    voice_profiles<T extends users$voice_profilesArgs<ExtArgs> = {}>(args?: Subset<T, users$voice_profilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.credentials
   */
  export type users$credentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    where?: credentialsWhereInput
    orderBy?: credentialsOrderByWithRelationInput | credentialsOrderByWithRelationInput[]
    cursor?: credentialsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CredentialsScalarFieldEnum | CredentialsScalarFieldEnum[]
  }

  /**
   * users.sessions
   */
  export type users$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    where?: sessionsWhereInput
    orderBy?: sessionsOrderByWithRelationInput | sessionsOrderByWithRelationInput[]
    cursor?: sessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionsScalarFieldEnum | SessionsScalarFieldEnum[]
  }

  /**
   * users.profiles
   */
  export type users$profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    where?: profilesWhereInput
  }

  /**
   * users.traits
   */
  export type users$traitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    where?: traitsWhereInput
    orderBy?: traitsOrderByWithRelationInput | traitsOrderByWithRelationInput[]
    cursor?: traitsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TraitsScalarFieldEnum | TraitsScalarFieldEnum[]
  }

  /**
   * users.sources
   */
  export type users$sourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    where?: sourcesWhereInput
    orderBy?: sourcesOrderByWithRelationInput | sourcesOrderByWithRelationInput[]
    cursor?: sourcesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SourcesScalarFieldEnum | SourcesScalarFieldEnum[]
  }

  /**
   * users.messages
   */
  export type users$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    where?: messagesWhereInput
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    cursor?: messagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * users.voice_profiles
   */
  export type users$voice_profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    where?: voice_profilesWhereInput
    orderBy?: voice_profilesOrderByWithRelationInput | voice_profilesOrderByWithRelationInput[]
    cursor?: voice_profilesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Voice_profilesScalarFieldEnum | Voice_profilesScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model credentials
   */

  export type AggregateCredentials = {
    _count: CredentialsCountAggregateOutputType | null
    _avg: CredentialsAvgAggregateOutputType | null
    _sum: CredentialsSumAggregateOutputType | null
    _min: CredentialsMinAggregateOutputType | null
    _max: CredentialsMaxAggregateOutputType | null
  }

  export type CredentialsAvgAggregateOutputType = {
    sign_count: number | null
  }

  export type CredentialsSumAggregateOutputType = {
    sign_count: number | null
  }

  export type CredentialsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    webauthn_credential_id: string | null
    public_key: string | null
    sign_count: number | null
    created_at: Date | null
  }

  export type CredentialsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    webauthn_credential_id: string | null
    public_key: string | null
    sign_count: number | null
    created_at: Date | null
  }

  export type CredentialsCountAggregateOutputType = {
    id: number
    user_id: number
    webauthn_credential_id: number
    public_key: number
    sign_count: number
    created_at: number
    _all: number
  }


  export type CredentialsAvgAggregateInputType = {
    sign_count?: true
  }

  export type CredentialsSumAggregateInputType = {
    sign_count?: true
  }

  export type CredentialsMinAggregateInputType = {
    id?: true
    user_id?: true
    webauthn_credential_id?: true
    public_key?: true
    sign_count?: true
    created_at?: true
  }

  export type CredentialsMaxAggregateInputType = {
    id?: true
    user_id?: true
    webauthn_credential_id?: true
    public_key?: true
    sign_count?: true
    created_at?: true
  }

  export type CredentialsCountAggregateInputType = {
    id?: true
    user_id?: true
    webauthn_credential_id?: true
    public_key?: true
    sign_count?: true
    created_at?: true
    _all?: true
  }

  export type CredentialsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which credentials to aggregate.
     */
    where?: credentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credentials to fetch.
     */
    orderBy?: credentialsOrderByWithRelationInput | credentialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: credentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned credentials
    **/
    _count?: true | CredentialsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CredentialsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CredentialsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CredentialsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CredentialsMaxAggregateInputType
  }

  export type GetCredentialsAggregateType<T extends CredentialsAggregateArgs> = {
        [P in keyof T & keyof AggregateCredentials]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCredentials[P]>
      : GetScalarType<T[P], AggregateCredentials[P]>
  }




  export type credentialsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: credentialsWhereInput
    orderBy?: credentialsOrderByWithAggregationInput | credentialsOrderByWithAggregationInput[]
    by: CredentialsScalarFieldEnum[] | CredentialsScalarFieldEnum
    having?: credentialsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CredentialsCountAggregateInputType | true
    _avg?: CredentialsAvgAggregateInputType
    _sum?: CredentialsSumAggregateInputType
    _min?: CredentialsMinAggregateInputType
    _max?: CredentialsMaxAggregateInputType
  }

  export type CredentialsGroupByOutputType = {
    id: string
    user_id: string
    webauthn_credential_id: string
    public_key: string
    sign_count: number
    created_at: Date
    _count: CredentialsCountAggregateOutputType | null
    _avg: CredentialsAvgAggregateOutputType | null
    _sum: CredentialsSumAggregateOutputType | null
    _min: CredentialsMinAggregateOutputType | null
    _max: CredentialsMaxAggregateOutputType | null
  }

  type GetCredentialsGroupByPayload<T extends credentialsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CredentialsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CredentialsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CredentialsGroupByOutputType[P]>
            : GetScalarType<T[P], CredentialsGroupByOutputType[P]>
        }
      >
    >


  export type credentialsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    webauthn_credential_id?: boolean
    public_key?: boolean
    sign_count?: boolean
    created_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credentials"]>

  export type credentialsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    webauthn_credential_id?: boolean
    public_key?: boolean
    sign_count?: boolean
    created_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credentials"]>

  export type credentialsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    webauthn_credential_id?: boolean
    public_key?: boolean
    sign_count?: boolean
    created_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credentials"]>

  export type credentialsSelectScalar = {
    id?: boolean
    user_id?: boolean
    webauthn_credential_id?: boolean
    public_key?: boolean
    sign_count?: boolean
    created_at?: boolean
  }

  export type credentialsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "webauthn_credential_id" | "public_key" | "sign_count" | "created_at", ExtArgs["result"]["credentials"]>
  export type credentialsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type credentialsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type credentialsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $credentialsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "credentials"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      webauthn_credential_id: string
      public_key: string
      sign_count: number
      created_at: Date
    }, ExtArgs["result"]["credentials"]>
    composites: {}
  }

  type credentialsGetPayload<S extends boolean | null | undefined | credentialsDefaultArgs> = $Result.GetResult<Prisma.$credentialsPayload, S>

  type credentialsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<credentialsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CredentialsCountAggregateInputType | true
    }

  export interface credentialsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['credentials'], meta: { name: 'credentials' } }
    /**
     * Find zero or one Credentials that matches the filter.
     * @param {credentialsFindUniqueArgs} args - Arguments to find a Credentials
     * @example
     * // Get one Credentials
     * const credentials = await prisma.credentials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends credentialsFindUniqueArgs>(args: SelectSubset<T, credentialsFindUniqueArgs<ExtArgs>>): Prisma__credentialsClient<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Credentials that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {credentialsFindUniqueOrThrowArgs} args - Arguments to find a Credentials
     * @example
     * // Get one Credentials
     * const credentials = await prisma.credentials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends credentialsFindUniqueOrThrowArgs>(args: SelectSubset<T, credentialsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__credentialsClient<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credentialsFindFirstArgs} args - Arguments to find a Credentials
     * @example
     * // Get one Credentials
     * const credentials = await prisma.credentials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends credentialsFindFirstArgs>(args?: SelectSubset<T, credentialsFindFirstArgs<ExtArgs>>): Prisma__credentialsClient<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credentials that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credentialsFindFirstOrThrowArgs} args - Arguments to find a Credentials
     * @example
     * // Get one Credentials
     * const credentials = await prisma.credentials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends credentialsFindFirstOrThrowArgs>(args?: SelectSubset<T, credentialsFindFirstOrThrowArgs<ExtArgs>>): Prisma__credentialsClient<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Credentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credentialsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Credentials
     * const credentials = await prisma.credentials.findMany()
     * 
     * // Get first 10 Credentials
     * const credentials = await prisma.credentials.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const credentialsWithIdOnly = await prisma.credentials.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends credentialsFindManyArgs>(args?: SelectSubset<T, credentialsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Credentials.
     * @param {credentialsCreateArgs} args - Arguments to create a Credentials.
     * @example
     * // Create one Credentials
     * const Credentials = await prisma.credentials.create({
     *   data: {
     *     // ... data to create a Credentials
     *   }
     * })
     * 
     */
    create<T extends credentialsCreateArgs>(args: SelectSubset<T, credentialsCreateArgs<ExtArgs>>): Prisma__credentialsClient<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Credentials.
     * @param {credentialsCreateManyArgs} args - Arguments to create many Credentials.
     * @example
     * // Create many Credentials
     * const credentials = await prisma.credentials.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends credentialsCreateManyArgs>(args?: SelectSubset<T, credentialsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Credentials and returns the data saved in the database.
     * @param {credentialsCreateManyAndReturnArgs} args - Arguments to create many Credentials.
     * @example
     * // Create many Credentials
     * const credentials = await prisma.credentials.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Credentials and only return the `id`
     * const credentialsWithIdOnly = await prisma.credentials.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends credentialsCreateManyAndReturnArgs>(args?: SelectSubset<T, credentialsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Credentials.
     * @param {credentialsDeleteArgs} args - Arguments to delete one Credentials.
     * @example
     * // Delete one Credentials
     * const Credentials = await prisma.credentials.delete({
     *   where: {
     *     // ... filter to delete one Credentials
     *   }
     * })
     * 
     */
    delete<T extends credentialsDeleteArgs>(args: SelectSubset<T, credentialsDeleteArgs<ExtArgs>>): Prisma__credentialsClient<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Credentials.
     * @param {credentialsUpdateArgs} args - Arguments to update one Credentials.
     * @example
     * // Update one Credentials
     * const credentials = await prisma.credentials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends credentialsUpdateArgs>(args: SelectSubset<T, credentialsUpdateArgs<ExtArgs>>): Prisma__credentialsClient<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Credentials.
     * @param {credentialsDeleteManyArgs} args - Arguments to filter Credentials to delete.
     * @example
     * // Delete a few Credentials
     * const { count } = await prisma.credentials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends credentialsDeleteManyArgs>(args?: SelectSubset<T, credentialsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credentialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Credentials
     * const credentials = await prisma.credentials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends credentialsUpdateManyArgs>(args: SelectSubset<T, credentialsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credentials and returns the data updated in the database.
     * @param {credentialsUpdateManyAndReturnArgs} args - Arguments to update many Credentials.
     * @example
     * // Update many Credentials
     * const credentials = await prisma.credentials.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Credentials and only return the `id`
     * const credentialsWithIdOnly = await prisma.credentials.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends credentialsUpdateManyAndReturnArgs>(args: SelectSubset<T, credentialsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Credentials.
     * @param {credentialsUpsertArgs} args - Arguments to update or create a Credentials.
     * @example
     * // Update or create a Credentials
     * const credentials = await prisma.credentials.upsert({
     *   create: {
     *     // ... data to create a Credentials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Credentials we want to update
     *   }
     * })
     */
    upsert<T extends credentialsUpsertArgs>(args: SelectSubset<T, credentialsUpsertArgs<ExtArgs>>): Prisma__credentialsClient<$Result.GetResult<Prisma.$credentialsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credentialsCountArgs} args - Arguments to filter Credentials to count.
     * @example
     * // Count the number of Credentials
     * const count = await prisma.credentials.count({
     *   where: {
     *     // ... the filter for the Credentials we want to count
     *   }
     * })
    **/
    count<T extends credentialsCountArgs>(
      args?: Subset<T, credentialsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CredentialsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CredentialsAggregateArgs>(args: Subset<T, CredentialsAggregateArgs>): Prisma.PrismaPromise<GetCredentialsAggregateType<T>>

    /**
     * Group by Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credentialsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends credentialsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: credentialsGroupByArgs['orderBy'] }
        : { orderBy?: credentialsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, credentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCredentialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the credentials model
   */
  readonly fields: credentialsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for credentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__credentialsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the credentials model
   */
  interface credentialsFieldRefs {
    readonly id: FieldRef<"credentials", 'String'>
    readonly user_id: FieldRef<"credentials", 'String'>
    readonly webauthn_credential_id: FieldRef<"credentials", 'String'>
    readonly public_key: FieldRef<"credentials", 'String'>
    readonly sign_count: FieldRef<"credentials", 'Int'>
    readonly created_at: FieldRef<"credentials", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * credentials findUnique
   */
  export type credentialsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    /**
     * Filter, which credentials to fetch.
     */
    where: credentialsWhereUniqueInput
  }

  /**
   * credentials findUniqueOrThrow
   */
  export type credentialsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    /**
     * Filter, which credentials to fetch.
     */
    where: credentialsWhereUniqueInput
  }

  /**
   * credentials findFirst
   */
  export type credentialsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    /**
     * Filter, which credentials to fetch.
     */
    where?: credentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credentials to fetch.
     */
    orderBy?: credentialsOrderByWithRelationInput | credentialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for credentials.
     */
    cursor?: credentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of credentials.
     */
    distinct?: CredentialsScalarFieldEnum | CredentialsScalarFieldEnum[]
  }

  /**
   * credentials findFirstOrThrow
   */
  export type credentialsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    /**
     * Filter, which credentials to fetch.
     */
    where?: credentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credentials to fetch.
     */
    orderBy?: credentialsOrderByWithRelationInput | credentialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for credentials.
     */
    cursor?: credentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of credentials.
     */
    distinct?: CredentialsScalarFieldEnum | CredentialsScalarFieldEnum[]
  }

  /**
   * credentials findMany
   */
  export type credentialsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    /**
     * Filter, which credentials to fetch.
     */
    where?: credentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credentials to fetch.
     */
    orderBy?: credentialsOrderByWithRelationInput | credentialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing credentials.
     */
    cursor?: credentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credentials.
     */
    skip?: number
    distinct?: CredentialsScalarFieldEnum | CredentialsScalarFieldEnum[]
  }

  /**
   * credentials create
   */
  export type credentialsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    /**
     * The data needed to create a credentials.
     */
    data: XOR<credentialsCreateInput, credentialsUncheckedCreateInput>
  }

  /**
   * credentials createMany
   */
  export type credentialsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many credentials.
     */
    data: credentialsCreateManyInput | credentialsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * credentials createManyAndReturn
   */
  export type credentialsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * The data used to create many credentials.
     */
    data: credentialsCreateManyInput | credentialsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * credentials update
   */
  export type credentialsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    /**
     * The data needed to update a credentials.
     */
    data: XOR<credentialsUpdateInput, credentialsUncheckedUpdateInput>
    /**
     * Choose, which credentials to update.
     */
    where: credentialsWhereUniqueInput
  }

  /**
   * credentials updateMany
   */
  export type credentialsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update credentials.
     */
    data: XOR<credentialsUpdateManyMutationInput, credentialsUncheckedUpdateManyInput>
    /**
     * Filter which credentials to update
     */
    where?: credentialsWhereInput
    /**
     * Limit how many credentials to update.
     */
    limit?: number
  }

  /**
   * credentials updateManyAndReturn
   */
  export type credentialsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * The data used to update credentials.
     */
    data: XOR<credentialsUpdateManyMutationInput, credentialsUncheckedUpdateManyInput>
    /**
     * Filter which credentials to update
     */
    where?: credentialsWhereInput
    /**
     * Limit how many credentials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * credentials upsert
   */
  export type credentialsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    /**
     * The filter to search for the credentials to update in case it exists.
     */
    where: credentialsWhereUniqueInput
    /**
     * In case the credentials found by the `where` argument doesn't exist, create a new credentials with this data.
     */
    create: XOR<credentialsCreateInput, credentialsUncheckedCreateInput>
    /**
     * In case the credentials was found with the provided `where` argument, update it with this data.
     */
    update: XOR<credentialsUpdateInput, credentialsUncheckedUpdateInput>
  }

  /**
   * credentials delete
   */
  export type credentialsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
    /**
     * Filter which credentials to delete.
     */
    where: credentialsWhereUniqueInput
  }

  /**
   * credentials deleteMany
   */
  export type credentialsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which credentials to delete
     */
    where?: credentialsWhereInput
    /**
     * Limit how many credentials to delete.
     */
    limit?: number
  }

  /**
   * credentials without action
   */
  export type credentialsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credentials
     */
    select?: credentialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credentials
     */
    omit?: credentialsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credentialsInclude<ExtArgs> | null
  }


  /**
   * Model sessions
   */

  export type AggregateSessions = {
    _count: SessionsCountAggregateOutputType | null
    _min: SessionsMinAggregateOutputType | null
    _max: SessionsMaxAggregateOutputType | null
  }

  export type SessionsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    hashed_token: string | null
    user_agent: string | null
    ip_hash: string | null
    created_at: Date | null
    expires_at: Date | null
    revoked_at: Date | null
  }

  export type SessionsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    hashed_token: string | null
    user_agent: string | null
    ip_hash: string | null
    created_at: Date | null
    expires_at: Date | null
    revoked_at: Date | null
  }

  export type SessionsCountAggregateOutputType = {
    id: number
    user_id: number
    hashed_token: number
    user_agent: number
    ip_hash: number
    created_at: number
    expires_at: number
    revoked_at: number
    _all: number
  }


  export type SessionsMinAggregateInputType = {
    id?: true
    user_id?: true
    hashed_token?: true
    user_agent?: true
    ip_hash?: true
    created_at?: true
    expires_at?: true
    revoked_at?: true
  }

  export type SessionsMaxAggregateInputType = {
    id?: true
    user_id?: true
    hashed_token?: true
    user_agent?: true
    ip_hash?: true
    created_at?: true
    expires_at?: true
    revoked_at?: true
  }

  export type SessionsCountAggregateInputType = {
    id?: true
    user_id?: true
    hashed_token?: true
    user_agent?: true
    ip_hash?: true
    created_at?: true
    expires_at?: true
    revoked_at?: true
    _all?: true
  }

  export type SessionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sessions to aggregate.
     */
    where?: sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionsOrderByWithRelationInput | sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sessions
    **/
    _count?: true | SessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionsMaxAggregateInputType
  }

  export type GetSessionsAggregateType<T extends SessionsAggregateArgs> = {
        [P in keyof T & keyof AggregateSessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSessions[P]>
      : GetScalarType<T[P], AggregateSessions[P]>
  }




  export type sessionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessionsWhereInput
    orderBy?: sessionsOrderByWithAggregationInput | sessionsOrderByWithAggregationInput[]
    by: SessionsScalarFieldEnum[] | SessionsScalarFieldEnum
    having?: sessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionsCountAggregateInputType | true
    _min?: SessionsMinAggregateInputType
    _max?: SessionsMaxAggregateInputType
  }

  export type SessionsGroupByOutputType = {
    id: string
    user_id: string
    hashed_token: string
    user_agent: string
    ip_hash: string
    created_at: Date
    expires_at: Date
    revoked_at: Date | null
    _count: SessionsCountAggregateOutputType | null
    _min: SessionsMinAggregateOutputType | null
    _max: SessionsMaxAggregateOutputType | null
  }

  type GetSessionsGroupByPayload<T extends sessionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionsGroupByOutputType[P]>
            : GetScalarType<T[P], SessionsGroupByOutputType[P]>
        }
      >
    >


  export type sessionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    hashed_token?: boolean
    user_agent?: boolean
    ip_hash?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessions"]>

  export type sessionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    hashed_token?: boolean
    user_agent?: boolean
    ip_hash?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessions"]>

  export type sessionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    hashed_token?: boolean
    user_agent?: boolean
    ip_hash?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessions"]>

  export type sessionsSelectScalar = {
    id?: boolean
    user_id?: boolean
    hashed_token?: boolean
    user_agent?: boolean
    ip_hash?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked_at?: boolean
  }

  export type sessionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "hashed_token" | "user_agent" | "ip_hash" | "created_at" | "expires_at" | "revoked_at", ExtArgs["result"]["sessions"]>
  export type sessionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type sessionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type sessionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $sessionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sessions"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      hashed_token: string
      user_agent: string
      ip_hash: string
      created_at: Date
      expires_at: Date
      revoked_at: Date | null
    }, ExtArgs["result"]["sessions"]>
    composites: {}
  }

  type sessionsGetPayload<S extends boolean | null | undefined | sessionsDefaultArgs> = $Result.GetResult<Prisma.$sessionsPayload, S>

  type sessionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionsCountAggregateInputType | true
    }

  export interface sessionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sessions'], meta: { name: 'sessions' } }
    /**
     * Find zero or one Sessions that matches the filter.
     * @param {sessionsFindUniqueArgs} args - Arguments to find a Sessions
     * @example
     * // Get one Sessions
     * const sessions = await prisma.sessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sessionsFindUniqueArgs>(args: SelectSubset<T, sessionsFindUniqueArgs<ExtArgs>>): Prisma__sessionsClient<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sessions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sessionsFindUniqueOrThrowArgs} args - Arguments to find a Sessions
     * @example
     * // Get one Sessions
     * const sessions = await prisma.sessions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sessionsFindUniqueOrThrowArgs>(args: SelectSubset<T, sessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sessionsClient<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsFindFirstArgs} args - Arguments to find a Sessions
     * @example
     * // Get one Sessions
     * const sessions = await prisma.sessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sessionsFindFirstArgs>(args?: SelectSubset<T, sessionsFindFirstArgs<ExtArgs>>): Prisma__sessionsClient<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sessions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsFindFirstOrThrowArgs} args - Arguments to find a Sessions
     * @example
     * // Get one Sessions
     * const sessions = await prisma.sessions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sessionsFindFirstOrThrowArgs>(args?: SelectSubset<T, sessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__sessionsClient<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.sessions.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.sessions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionsWithIdOnly = await prisma.sessions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sessionsFindManyArgs>(args?: SelectSubset<T, sessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sessions.
     * @param {sessionsCreateArgs} args - Arguments to create a Sessions.
     * @example
     * // Create one Sessions
     * const Sessions = await prisma.sessions.create({
     *   data: {
     *     // ... data to create a Sessions
     *   }
     * })
     * 
     */
    create<T extends sessionsCreateArgs>(args: SelectSubset<T, sessionsCreateArgs<ExtArgs>>): Prisma__sessionsClient<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {sessionsCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const sessions = await prisma.sessions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sessionsCreateManyArgs>(args?: SelectSubset<T, sessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {sessionsCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const sessions = await prisma.sessions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionsWithIdOnly = await prisma.sessions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sessionsCreateManyAndReturnArgs>(args?: SelectSubset<T, sessionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sessions.
     * @param {sessionsDeleteArgs} args - Arguments to delete one Sessions.
     * @example
     * // Delete one Sessions
     * const Sessions = await prisma.sessions.delete({
     *   where: {
     *     // ... filter to delete one Sessions
     *   }
     * })
     * 
     */
    delete<T extends sessionsDeleteArgs>(args: SelectSubset<T, sessionsDeleteArgs<ExtArgs>>): Prisma__sessionsClient<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sessions.
     * @param {sessionsUpdateArgs} args - Arguments to update one Sessions.
     * @example
     * // Update one Sessions
     * const sessions = await prisma.sessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sessionsUpdateArgs>(args: SelectSubset<T, sessionsUpdateArgs<ExtArgs>>): Prisma__sessionsClient<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {sessionsDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.sessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sessionsDeleteManyArgs>(args?: SelectSubset<T, sessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const sessions = await prisma.sessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sessionsUpdateManyArgs>(args: SelectSubset<T, sessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {sessionsUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const sessions = await prisma.sessions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionsWithIdOnly = await prisma.sessions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sessionsUpdateManyAndReturnArgs>(args: SelectSubset<T, sessionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sessions.
     * @param {sessionsUpsertArgs} args - Arguments to update or create a Sessions.
     * @example
     * // Update or create a Sessions
     * const sessions = await prisma.sessions.upsert({
     *   create: {
     *     // ... data to create a Sessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sessions we want to update
     *   }
     * })
     */
    upsert<T extends sessionsUpsertArgs>(args: SelectSubset<T, sessionsUpsertArgs<ExtArgs>>): Prisma__sessionsClient<$Result.GetResult<Prisma.$sessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.sessions.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends sessionsCountArgs>(
      args?: Subset<T, sessionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionsAggregateArgs>(args: Subset<T, SessionsAggregateArgs>): Prisma.PrismaPromise<GetSessionsAggregateType<T>>

    /**
     * Group by Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sessionsGroupByArgs['orderBy'] }
        : { orderBy?: sessionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sessions model
   */
  readonly fields: sessionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sessionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sessions model
   */
  interface sessionsFieldRefs {
    readonly id: FieldRef<"sessions", 'String'>
    readonly user_id: FieldRef<"sessions", 'String'>
    readonly hashed_token: FieldRef<"sessions", 'String'>
    readonly user_agent: FieldRef<"sessions", 'String'>
    readonly ip_hash: FieldRef<"sessions", 'String'>
    readonly created_at: FieldRef<"sessions", 'DateTime'>
    readonly expires_at: FieldRef<"sessions", 'DateTime'>
    readonly revoked_at: FieldRef<"sessions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sessions findUnique
   */
  export type sessionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    /**
     * Filter, which sessions to fetch.
     */
    where: sessionsWhereUniqueInput
  }

  /**
   * sessions findUniqueOrThrow
   */
  export type sessionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    /**
     * Filter, which sessions to fetch.
     */
    where: sessionsWhereUniqueInput
  }

  /**
   * sessions findFirst
   */
  export type sessionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    /**
     * Filter, which sessions to fetch.
     */
    where?: sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionsOrderByWithRelationInput | sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionsScalarFieldEnum | SessionsScalarFieldEnum[]
  }

  /**
   * sessions findFirstOrThrow
   */
  export type sessionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    /**
     * Filter, which sessions to fetch.
     */
    where?: sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionsOrderByWithRelationInput | sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionsScalarFieldEnum | SessionsScalarFieldEnum[]
  }

  /**
   * sessions findMany
   */
  export type sessionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    /**
     * Filter, which sessions to fetch.
     */
    where?: sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionsOrderByWithRelationInput | sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sessions.
     */
    cursor?: sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    distinct?: SessionsScalarFieldEnum | SessionsScalarFieldEnum[]
  }

  /**
   * sessions create
   */
  export type sessionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    /**
     * The data needed to create a sessions.
     */
    data: XOR<sessionsCreateInput, sessionsUncheckedCreateInput>
  }

  /**
   * sessions createMany
   */
  export type sessionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sessions.
     */
    data: sessionsCreateManyInput | sessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sessions createManyAndReturn
   */
  export type sessionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * The data used to create many sessions.
     */
    data: sessionsCreateManyInput | sessionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * sessions update
   */
  export type sessionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    /**
     * The data needed to update a sessions.
     */
    data: XOR<sessionsUpdateInput, sessionsUncheckedUpdateInput>
    /**
     * Choose, which sessions to update.
     */
    where: sessionsWhereUniqueInput
  }

  /**
   * sessions updateMany
   */
  export type sessionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sessions.
     */
    data: XOR<sessionsUpdateManyMutationInput, sessionsUncheckedUpdateManyInput>
    /**
     * Filter which sessions to update
     */
    where?: sessionsWhereInput
    /**
     * Limit how many sessions to update.
     */
    limit?: number
  }

  /**
   * sessions updateManyAndReturn
   */
  export type sessionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * The data used to update sessions.
     */
    data: XOR<sessionsUpdateManyMutationInput, sessionsUncheckedUpdateManyInput>
    /**
     * Filter which sessions to update
     */
    where?: sessionsWhereInput
    /**
     * Limit how many sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * sessions upsert
   */
  export type sessionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    /**
     * The filter to search for the sessions to update in case it exists.
     */
    where: sessionsWhereUniqueInput
    /**
     * In case the sessions found by the `where` argument doesn't exist, create a new sessions with this data.
     */
    create: XOR<sessionsCreateInput, sessionsUncheckedCreateInput>
    /**
     * In case the sessions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sessionsUpdateInput, sessionsUncheckedUpdateInput>
  }

  /**
   * sessions delete
   */
  export type sessionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
    /**
     * Filter which sessions to delete.
     */
    where: sessionsWhereUniqueInput
  }

  /**
   * sessions deleteMany
   */
  export type sessionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sessions to delete
     */
    where?: sessionsWhereInput
    /**
     * Limit how many sessions to delete.
     */
    limit?: number
  }

  /**
   * sessions without action
   */
  export type sessionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessions
     */
    select?: sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessions
     */
    omit?: sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionsInclude<ExtArgs> | null
  }


  /**
   * Model profiles
   */

  export type AggregateProfiles = {
    _count: ProfilesCountAggregateOutputType | null
    _min: ProfilesMinAggregateOutputType | null
    _max: ProfilesMaxAggregateOutputType | null
  }

  export type ProfilesMinAggregateOutputType = {
    user_id: string | null
    display_name: string | null
    timezone: string | null
    theme_color: string | null
    updated_at: Date | null
  }

  export type ProfilesMaxAggregateOutputType = {
    user_id: string | null
    display_name: string | null
    timezone: string | null
    theme_color: string | null
    updated_at: Date | null
  }

  export type ProfilesCountAggregateOutputType = {
    user_id: number
    display_name: number
    timezone: number
    theme_color: number
    updated_at: number
    _all: number
  }


  export type ProfilesMinAggregateInputType = {
    user_id?: true
    display_name?: true
    timezone?: true
    theme_color?: true
    updated_at?: true
  }

  export type ProfilesMaxAggregateInputType = {
    user_id?: true
    display_name?: true
    timezone?: true
    theme_color?: true
    updated_at?: true
  }

  export type ProfilesCountAggregateInputType = {
    user_id?: true
    display_name?: true
    timezone?: true
    theme_color?: true
    updated_at?: true
    _all?: true
  }

  export type ProfilesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which profiles to aggregate.
     */
    where?: profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profilesOrderByWithRelationInput | profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned profiles
    **/
    _count?: true | ProfilesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfilesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfilesMaxAggregateInputType
  }

  export type GetProfilesAggregateType<T extends ProfilesAggregateArgs> = {
        [P in keyof T & keyof AggregateProfiles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfiles[P]>
      : GetScalarType<T[P], AggregateProfiles[P]>
  }




  export type profilesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: profilesWhereInput
    orderBy?: profilesOrderByWithAggregationInput | profilesOrderByWithAggregationInput[]
    by: ProfilesScalarFieldEnum[] | ProfilesScalarFieldEnum
    having?: profilesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfilesCountAggregateInputType | true
    _min?: ProfilesMinAggregateInputType
    _max?: ProfilesMaxAggregateInputType
  }

  export type ProfilesGroupByOutputType = {
    user_id: string
    display_name: string | null
    timezone: string | null
    theme_color: string | null
    updated_at: Date
    _count: ProfilesCountAggregateOutputType | null
    _min: ProfilesMinAggregateOutputType | null
    _max: ProfilesMaxAggregateOutputType | null
  }

  type GetProfilesGroupByPayload<T extends profilesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfilesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfilesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfilesGroupByOutputType[P]>
            : GetScalarType<T[P], ProfilesGroupByOutputType[P]>
        }
      >
    >


  export type profilesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    display_name?: boolean
    timezone?: boolean
    theme_color?: boolean
    updated_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profiles"]>

  export type profilesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    display_name?: boolean
    timezone?: boolean
    theme_color?: boolean
    updated_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profiles"]>

  export type profilesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    display_name?: boolean
    timezone?: boolean
    theme_color?: boolean
    updated_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profiles"]>

  export type profilesSelectScalar = {
    user_id?: boolean
    display_name?: boolean
    timezone?: boolean
    theme_color?: boolean
    updated_at?: boolean
  }

  export type profilesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "display_name" | "timezone" | "theme_color" | "updated_at", ExtArgs["result"]["profiles"]>
  export type profilesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type profilesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type profilesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $profilesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "profiles"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      display_name: string | null
      timezone: string | null
      theme_color: string | null
      updated_at: Date
    }, ExtArgs["result"]["profiles"]>
    composites: {}
  }

  type profilesGetPayload<S extends boolean | null | undefined | profilesDefaultArgs> = $Result.GetResult<Prisma.$profilesPayload, S>

  type profilesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<profilesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfilesCountAggregateInputType | true
    }

  export interface profilesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['profiles'], meta: { name: 'profiles' } }
    /**
     * Find zero or one Profiles that matches the filter.
     * @param {profilesFindUniqueArgs} args - Arguments to find a Profiles
     * @example
     * // Get one Profiles
     * const profiles = await prisma.profiles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends profilesFindUniqueArgs>(args: SelectSubset<T, profilesFindUniqueArgs<ExtArgs>>): Prisma__profilesClient<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profiles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {profilesFindUniqueOrThrowArgs} args - Arguments to find a Profiles
     * @example
     * // Get one Profiles
     * const profiles = await prisma.profiles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends profilesFindUniqueOrThrowArgs>(args: SelectSubset<T, profilesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__profilesClient<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profilesFindFirstArgs} args - Arguments to find a Profiles
     * @example
     * // Get one Profiles
     * const profiles = await prisma.profiles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends profilesFindFirstArgs>(args?: SelectSubset<T, profilesFindFirstArgs<ExtArgs>>): Prisma__profilesClient<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profiles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profilesFindFirstOrThrowArgs} args - Arguments to find a Profiles
     * @example
     * // Get one Profiles
     * const profiles = await prisma.profiles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends profilesFindFirstOrThrowArgs>(args?: SelectSubset<T, profilesFindFirstOrThrowArgs<ExtArgs>>): Prisma__profilesClient<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profilesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profiles.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profiles.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const profilesWithUser_idOnly = await prisma.profiles.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends profilesFindManyArgs>(args?: SelectSubset<T, profilesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profiles.
     * @param {profilesCreateArgs} args - Arguments to create a Profiles.
     * @example
     * // Create one Profiles
     * const Profiles = await prisma.profiles.create({
     *   data: {
     *     // ... data to create a Profiles
     *   }
     * })
     * 
     */
    create<T extends profilesCreateArgs>(args: SelectSubset<T, profilesCreateArgs<ExtArgs>>): Prisma__profilesClient<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {profilesCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profiles = await prisma.profiles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends profilesCreateManyArgs>(args?: SelectSubset<T, profilesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {profilesCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profiles = await prisma.profiles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `user_id`
     * const profilesWithUser_idOnly = await prisma.profiles.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends profilesCreateManyAndReturnArgs>(args?: SelectSubset<T, profilesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profiles.
     * @param {profilesDeleteArgs} args - Arguments to delete one Profiles.
     * @example
     * // Delete one Profiles
     * const Profiles = await prisma.profiles.delete({
     *   where: {
     *     // ... filter to delete one Profiles
     *   }
     * })
     * 
     */
    delete<T extends profilesDeleteArgs>(args: SelectSubset<T, profilesDeleteArgs<ExtArgs>>): Prisma__profilesClient<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profiles.
     * @param {profilesUpdateArgs} args - Arguments to update one Profiles.
     * @example
     * // Update one Profiles
     * const profiles = await prisma.profiles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends profilesUpdateArgs>(args: SelectSubset<T, profilesUpdateArgs<ExtArgs>>): Prisma__profilesClient<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {profilesDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profiles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends profilesDeleteManyArgs>(args?: SelectSubset<T, profilesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profilesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profiles = await prisma.profiles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends profilesUpdateManyArgs>(args: SelectSubset<T, profilesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {profilesUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profiles = await prisma.profiles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `user_id`
     * const profilesWithUser_idOnly = await prisma.profiles.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends profilesUpdateManyAndReturnArgs>(args: SelectSubset<T, profilesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profiles.
     * @param {profilesUpsertArgs} args - Arguments to update or create a Profiles.
     * @example
     * // Update or create a Profiles
     * const profiles = await prisma.profiles.upsert({
     *   create: {
     *     // ... data to create a Profiles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profiles we want to update
     *   }
     * })
     */
    upsert<T extends profilesUpsertArgs>(args: SelectSubset<T, profilesUpsertArgs<ExtArgs>>): Prisma__profilesClient<$Result.GetResult<Prisma.$profilesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profilesCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profiles.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends profilesCountArgs>(
      args?: Subset<T, profilesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfilesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfilesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfilesAggregateArgs>(args: Subset<T, ProfilesAggregateArgs>): Prisma.PrismaPromise<GetProfilesAggregateType<T>>

    /**
     * Group by Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profilesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends profilesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: profilesGroupByArgs['orderBy'] }
        : { orderBy?: profilesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, profilesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfilesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the profiles model
   */
  readonly fields: profilesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for profiles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__profilesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the profiles model
   */
  interface profilesFieldRefs {
    readonly user_id: FieldRef<"profiles", 'String'>
    readonly display_name: FieldRef<"profiles", 'String'>
    readonly timezone: FieldRef<"profiles", 'String'>
    readonly theme_color: FieldRef<"profiles", 'String'>
    readonly updated_at: FieldRef<"profiles", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * profiles findUnique
   */
  export type profilesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    /**
     * Filter, which profiles to fetch.
     */
    where: profilesWhereUniqueInput
  }

  /**
   * profiles findUniqueOrThrow
   */
  export type profilesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    /**
     * Filter, which profiles to fetch.
     */
    where: profilesWhereUniqueInput
  }

  /**
   * profiles findFirst
   */
  export type profilesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    /**
     * Filter, which profiles to fetch.
     */
    where?: profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profilesOrderByWithRelationInput | profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for profiles.
     */
    cursor?: profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of profiles.
     */
    distinct?: ProfilesScalarFieldEnum | ProfilesScalarFieldEnum[]
  }

  /**
   * profiles findFirstOrThrow
   */
  export type profilesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    /**
     * Filter, which profiles to fetch.
     */
    where?: profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profilesOrderByWithRelationInput | profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for profiles.
     */
    cursor?: profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of profiles.
     */
    distinct?: ProfilesScalarFieldEnum | ProfilesScalarFieldEnum[]
  }

  /**
   * profiles findMany
   */
  export type profilesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    /**
     * Filter, which profiles to fetch.
     */
    where?: profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profilesOrderByWithRelationInput | profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing profiles.
     */
    cursor?: profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    distinct?: ProfilesScalarFieldEnum | ProfilesScalarFieldEnum[]
  }

  /**
   * profiles create
   */
  export type profilesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    /**
     * The data needed to create a profiles.
     */
    data: XOR<profilesCreateInput, profilesUncheckedCreateInput>
  }

  /**
   * profiles createMany
   */
  export type profilesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many profiles.
     */
    data: profilesCreateManyInput | profilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * profiles createManyAndReturn
   */
  export type profilesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * The data used to create many profiles.
     */
    data: profilesCreateManyInput | profilesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * profiles update
   */
  export type profilesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    /**
     * The data needed to update a profiles.
     */
    data: XOR<profilesUpdateInput, profilesUncheckedUpdateInput>
    /**
     * Choose, which profiles to update.
     */
    where: profilesWhereUniqueInput
  }

  /**
   * profiles updateMany
   */
  export type profilesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update profiles.
     */
    data: XOR<profilesUpdateManyMutationInput, profilesUncheckedUpdateManyInput>
    /**
     * Filter which profiles to update
     */
    where?: profilesWhereInput
    /**
     * Limit how many profiles to update.
     */
    limit?: number
  }

  /**
   * profiles updateManyAndReturn
   */
  export type profilesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * The data used to update profiles.
     */
    data: XOR<profilesUpdateManyMutationInput, profilesUncheckedUpdateManyInput>
    /**
     * Filter which profiles to update
     */
    where?: profilesWhereInput
    /**
     * Limit how many profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * profiles upsert
   */
  export type profilesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    /**
     * The filter to search for the profiles to update in case it exists.
     */
    where: profilesWhereUniqueInput
    /**
     * In case the profiles found by the `where` argument doesn't exist, create a new profiles with this data.
     */
    create: XOR<profilesCreateInput, profilesUncheckedCreateInput>
    /**
     * In case the profiles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<profilesUpdateInput, profilesUncheckedUpdateInput>
  }

  /**
   * profiles delete
   */
  export type profilesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
    /**
     * Filter which profiles to delete.
     */
    where: profilesWhereUniqueInput
  }

  /**
   * profiles deleteMany
   */
  export type profilesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which profiles to delete
     */
    where?: profilesWhereInput
    /**
     * Limit how many profiles to delete.
     */
    limit?: number
  }

  /**
   * profiles without action
   */
  export type profilesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profiles
     */
    select?: profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profiles
     */
    omit?: profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profilesInclude<ExtArgs> | null
  }


  /**
   * Model traits
   */

  export type AggregateTraits = {
    _count: TraitsCountAggregateOutputType | null
    _avg: TraitsAvgAggregateOutputType | null
    _sum: TraitsSumAggregateOutputType | null
    _min: TraitsMinAggregateOutputType | null
    _max: TraitsMaxAggregateOutputType | null
  }

  export type TraitsAvgAggregateOutputType = {
    confidence: number | null
    completeness: number | null
  }

  export type TraitsSumAggregateOutputType = {
    confidence: number | null
    completeness: number | null
  }

  export type TraitsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    category: string | null
    key: string | null
    confidence: number | null
    completeness: number | null
    provenance: string | null
    updated_at: Date | null
    source_id: string | null
  }

  export type TraitsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    category: string | null
    key: string | null
    confidence: number | null
    completeness: number | null
    provenance: string | null
    updated_at: Date | null
    source_id: string | null
  }

  export type TraitsCountAggregateOutputType = {
    id: number
    user_id: number
    category: number
    key: number
    value_json: number
    confidence: number
    completeness: number
    provenance: number
    updated_at: number
    source_id: number
    _all: number
  }


  export type TraitsAvgAggregateInputType = {
    confidence?: true
    completeness?: true
  }

  export type TraitsSumAggregateInputType = {
    confidence?: true
    completeness?: true
  }

  export type TraitsMinAggregateInputType = {
    id?: true
    user_id?: true
    category?: true
    key?: true
    confidence?: true
    completeness?: true
    provenance?: true
    updated_at?: true
    source_id?: true
  }

  export type TraitsMaxAggregateInputType = {
    id?: true
    user_id?: true
    category?: true
    key?: true
    confidence?: true
    completeness?: true
    provenance?: true
    updated_at?: true
    source_id?: true
  }

  export type TraitsCountAggregateInputType = {
    id?: true
    user_id?: true
    category?: true
    key?: true
    value_json?: true
    confidence?: true
    completeness?: true
    provenance?: true
    updated_at?: true
    source_id?: true
    _all?: true
  }

  export type TraitsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which traits to aggregate.
     */
    where?: traitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of traits to fetch.
     */
    orderBy?: traitsOrderByWithRelationInput | traitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: traitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` traits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` traits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned traits
    **/
    _count?: true | TraitsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TraitsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TraitsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TraitsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TraitsMaxAggregateInputType
  }

  export type GetTraitsAggregateType<T extends TraitsAggregateArgs> = {
        [P in keyof T & keyof AggregateTraits]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTraits[P]>
      : GetScalarType<T[P], AggregateTraits[P]>
  }




  export type traitsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: traitsWhereInput
    orderBy?: traitsOrderByWithAggregationInput | traitsOrderByWithAggregationInput[]
    by: TraitsScalarFieldEnum[] | TraitsScalarFieldEnum
    having?: traitsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TraitsCountAggregateInputType | true
    _avg?: TraitsAvgAggregateInputType
    _sum?: TraitsSumAggregateInputType
    _min?: TraitsMinAggregateInputType
    _max?: TraitsMaxAggregateInputType
  }

  export type TraitsGroupByOutputType = {
    id: string
    user_id: string
    category: string
    key: string
    value_json: JsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at: Date
    source_id: string | null
    _count: TraitsCountAggregateOutputType | null
    _avg: TraitsAvgAggregateOutputType | null
    _sum: TraitsSumAggregateOutputType | null
    _min: TraitsMinAggregateOutputType | null
    _max: TraitsMaxAggregateOutputType | null
  }

  type GetTraitsGroupByPayload<T extends traitsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TraitsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TraitsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TraitsGroupByOutputType[P]>
            : GetScalarType<T[P], TraitsGroupByOutputType[P]>
        }
      >
    >


  export type traitsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    category?: boolean
    key?: boolean
    value_json?: boolean
    confidence?: boolean
    completeness?: boolean
    provenance?: boolean
    updated_at?: boolean
    source_id?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    sources?: boolean | traits$sourcesArgs<ExtArgs>
  }, ExtArgs["result"]["traits"]>

  export type traitsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    category?: boolean
    key?: boolean
    value_json?: boolean
    confidence?: boolean
    completeness?: boolean
    provenance?: boolean
    updated_at?: boolean
    source_id?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    sources?: boolean | traits$sourcesArgs<ExtArgs>
  }, ExtArgs["result"]["traits"]>

  export type traitsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    category?: boolean
    key?: boolean
    value_json?: boolean
    confidence?: boolean
    completeness?: boolean
    provenance?: boolean
    updated_at?: boolean
    source_id?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    sources?: boolean | traits$sourcesArgs<ExtArgs>
  }, ExtArgs["result"]["traits"]>

  export type traitsSelectScalar = {
    id?: boolean
    user_id?: boolean
    category?: boolean
    key?: boolean
    value_json?: boolean
    confidence?: boolean
    completeness?: boolean
    provenance?: boolean
    updated_at?: boolean
    source_id?: boolean
  }

  export type traitsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "category" | "key" | "value_json" | "confidence" | "completeness" | "provenance" | "updated_at" | "source_id", ExtArgs["result"]["traits"]>
  export type traitsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    sources?: boolean | traits$sourcesArgs<ExtArgs>
  }
  export type traitsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    sources?: boolean | traits$sourcesArgs<ExtArgs>
  }
  export type traitsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    sources?: boolean | traits$sourcesArgs<ExtArgs>
  }

  export type $traitsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "traits"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      sources: Prisma.$sourcesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      category: string
      key: string
      value_json: Prisma.JsonValue
      confidence: number
      completeness: number
      provenance: string
      updated_at: Date
      source_id: string | null
    }, ExtArgs["result"]["traits"]>
    composites: {}
  }

  type traitsGetPayload<S extends boolean | null | undefined | traitsDefaultArgs> = $Result.GetResult<Prisma.$traitsPayload, S>

  type traitsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<traitsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TraitsCountAggregateInputType | true
    }

  export interface traitsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['traits'], meta: { name: 'traits' } }
    /**
     * Find zero or one Traits that matches the filter.
     * @param {traitsFindUniqueArgs} args - Arguments to find a Traits
     * @example
     * // Get one Traits
     * const traits = await prisma.traits.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends traitsFindUniqueArgs>(args: SelectSubset<T, traitsFindUniqueArgs<ExtArgs>>): Prisma__traitsClient<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Traits that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {traitsFindUniqueOrThrowArgs} args - Arguments to find a Traits
     * @example
     * // Get one Traits
     * const traits = await prisma.traits.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends traitsFindUniqueOrThrowArgs>(args: SelectSubset<T, traitsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__traitsClient<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Traits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {traitsFindFirstArgs} args - Arguments to find a Traits
     * @example
     * // Get one Traits
     * const traits = await prisma.traits.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends traitsFindFirstArgs>(args?: SelectSubset<T, traitsFindFirstArgs<ExtArgs>>): Prisma__traitsClient<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Traits that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {traitsFindFirstOrThrowArgs} args - Arguments to find a Traits
     * @example
     * // Get one Traits
     * const traits = await prisma.traits.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends traitsFindFirstOrThrowArgs>(args?: SelectSubset<T, traitsFindFirstOrThrowArgs<ExtArgs>>): Prisma__traitsClient<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Traits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {traitsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Traits
     * const traits = await prisma.traits.findMany()
     * 
     * // Get first 10 Traits
     * const traits = await prisma.traits.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const traitsWithIdOnly = await prisma.traits.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends traitsFindManyArgs>(args?: SelectSubset<T, traitsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Traits.
     * @param {traitsCreateArgs} args - Arguments to create a Traits.
     * @example
     * // Create one Traits
     * const Traits = await prisma.traits.create({
     *   data: {
     *     // ... data to create a Traits
     *   }
     * })
     * 
     */
    create<T extends traitsCreateArgs>(args: SelectSubset<T, traitsCreateArgs<ExtArgs>>): Prisma__traitsClient<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Traits.
     * @param {traitsCreateManyArgs} args - Arguments to create many Traits.
     * @example
     * // Create many Traits
     * const traits = await prisma.traits.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends traitsCreateManyArgs>(args?: SelectSubset<T, traitsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Traits and returns the data saved in the database.
     * @param {traitsCreateManyAndReturnArgs} args - Arguments to create many Traits.
     * @example
     * // Create many Traits
     * const traits = await prisma.traits.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Traits and only return the `id`
     * const traitsWithIdOnly = await prisma.traits.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends traitsCreateManyAndReturnArgs>(args?: SelectSubset<T, traitsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Traits.
     * @param {traitsDeleteArgs} args - Arguments to delete one Traits.
     * @example
     * // Delete one Traits
     * const Traits = await prisma.traits.delete({
     *   where: {
     *     // ... filter to delete one Traits
     *   }
     * })
     * 
     */
    delete<T extends traitsDeleteArgs>(args: SelectSubset<T, traitsDeleteArgs<ExtArgs>>): Prisma__traitsClient<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Traits.
     * @param {traitsUpdateArgs} args - Arguments to update one Traits.
     * @example
     * // Update one Traits
     * const traits = await prisma.traits.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends traitsUpdateArgs>(args: SelectSubset<T, traitsUpdateArgs<ExtArgs>>): Prisma__traitsClient<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Traits.
     * @param {traitsDeleteManyArgs} args - Arguments to filter Traits to delete.
     * @example
     * // Delete a few Traits
     * const { count } = await prisma.traits.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends traitsDeleteManyArgs>(args?: SelectSubset<T, traitsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Traits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {traitsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Traits
     * const traits = await prisma.traits.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends traitsUpdateManyArgs>(args: SelectSubset<T, traitsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Traits and returns the data updated in the database.
     * @param {traitsUpdateManyAndReturnArgs} args - Arguments to update many Traits.
     * @example
     * // Update many Traits
     * const traits = await prisma.traits.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Traits and only return the `id`
     * const traitsWithIdOnly = await prisma.traits.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends traitsUpdateManyAndReturnArgs>(args: SelectSubset<T, traitsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Traits.
     * @param {traitsUpsertArgs} args - Arguments to update or create a Traits.
     * @example
     * // Update or create a Traits
     * const traits = await prisma.traits.upsert({
     *   create: {
     *     // ... data to create a Traits
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Traits we want to update
     *   }
     * })
     */
    upsert<T extends traitsUpsertArgs>(args: SelectSubset<T, traitsUpsertArgs<ExtArgs>>): Prisma__traitsClient<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Traits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {traitsCountArgs} args - Arguments to filter Traits to count.
     * @example
     * // Count the number of Traits
     * const count = await prisma.traits.count({
     *   where: {
     *     // ... the filter for the Traits we want to count
     *   }
     * })
    **/
    count<T extends traitsCountArgs>(
      args?: Subset<T, traitsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TraitsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Traits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TraitsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TraitsAggregateArgs>(args: Subset<T, TraitsAggregateArgs>): Prisma.PrismaPromise<GetTraitsAggregateType<T>>

    /**
     * Group by Traits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {traitsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends traitsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: traitsGroupByArgs['orderBy'] }
        : { orderBy?: traitsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, traitsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTraitsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the traits model
   */
  readonly fields: traitsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for traits.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__traitsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sources<T extends traits$sourcesArgs<ExtArgs> = {}>(args?: Subset<T, traits$sourcesArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the traits model
   */
  interface traitsFieldRefs {
    readonly id: FieldRef<"traits", 'String'>
    readonly user_id: FieldRef<"traits", 'String'>
    readonly category: FieldRef<"traits", 'String'>
    readonly key: FieldRef<"traits", 'String'>
    readonly value_json: FieldRef<"traits", 'Json'>
    readonly confidence: FieldRef<"traits", 'Float'>
    readonly completeness: FieldRef<"traits", 'Float'>
    readonly provenance: FieldRef<"traits", 'String'>
    readonly updated_at: FieldRef<"traits", 'DateTime'>
    readonly source_id: FieldRef<"traits", 'String'>
  }
    

  // Custom InputTypes
  /**
   * traits findUnique
   */
  export type traitsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    /**
     * Filter, which traits to fetch.
     */
    where: traitsWhereUniqueInput
  }

  /**
   * traits findUniqueOrThrow
   */
  export type traitsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    /**
     * Filter, which traits to fetch.
     */
    where: traitsWhereUniqueInput
  }

  /**
   * traits findFirst
   */
  export type traitsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    /**
     * Filter, which traits to fetch.
     */
    where?: traitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of traits to fetch.
     */
    orderBy?: traitsOrderByWithRelationInput | traitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for traits.
     */
    cursor?: traitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` traits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` traits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of traits.
     */
    distinct?: TraitsScalarFieldEnum | TraitsScalarFieldEnum[]
  }

  /**
   * traits findFirstOrThrow
   */
  export type traitsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    /**
     * Filter, which traits to fetch.
     */
    where?: traitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of traits to fetch.
     */
    orderBy?: traitsOrderByWithRelationInput | traitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for traits.
     */
    cursor?: traitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` traits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` traits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of traits.
     */
    distinct?: TraitsScalarFieldEnum | TraitsScalarFieldEnum[]
  }

  /**
   * traits findMany
   */
  export type traitsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    /**
     * Filter, which traits to fetch.
     */
    where?: traitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of traits to fetch.
     */
    orderBy?: traitsOrderByWithRelationInput | traitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing traits.
     */
    cursor?: traitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` traits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` traits.
     */
    skip?: number
    distinct?: TraitsScalarFieldEnum | TraitsScalarFieldEnum[]
  }

  /**
   * traits create
   */
  export type traitsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    /**
     * The data needed to create a traits.
     */
    data: XOR<traitsCreateInput, traitsUncheckedCreateInput>
  }

  /**
   * traits createMany
   */
  export type traitsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many traits.
     */
    data: traitsCreateManyInput | traitsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * traits createManyAndReturn
   */
  export type traitsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * The data used to create many traits.
     */
    data: traitsCreateManyInput | traitsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * traits update
   */
  export type traitsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    /**
     * The data needed to update a traits.
     */
    data: XOR<traitsUpdateInput, traitsUncheckedUpdateInput>
    /**
     * Choose, which traits to update.
     */
    where: traitsWhereUniqueInput
  }

  /**
   * traits updateMany
   */
  export type traitsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update traits.
     */
    data: XOR<traitsUpdateManyMutationInput, traitsUncheckedUpdateManyInput>
    /**
     * Filter which traits to update
     */
    where?: traitsWhereInput
    /**
     * Limit how many traits to update.
     */
    limit?: number
  }

  /**
   * traits updateManyAndReturn
   */
  export type traitsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * The data used to update traits.
     */
    data: XOR<traitsUpdateManyMutationInput, traitsUncheckedUpdateManyInput>
    /**
     * Filter which traits to update
     */
    where?: traitsWhereInput
    /**
     * Limit how many traits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * traits upsert
   */
  export type traitsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    /**
     * The filter to search for the traits to update in case it exists.
     */
    where: traitsWhereUniqueInput
    /**
     * In case the traits found by the `where` argument doesn't exist, create a new traits with this data.
     */
    create: XOR<traitsCreateInput, traitsUncheckedCreateInput>
    /**
     * In case the traits was found with the provided `where` argument, update it with this data.
     */
    update: XOR<traitsUpdateInput, traitsUncheckedUpdateInput>
  }

  /**
   * traits delete
   */
  export type traitsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    /**
     * Filter which traits to delete.
     */
    where: traitsWhereUniqueInput
  }

  /**
   * traits deleteMany
   */
  export type traitsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which traits to delete
     */
    where?: traitsWhereInput
    /**
     * Limit how many traits to delete.
     */
    limit?: number
  }

  /**
   * traits.sources
   */
  export type traits$sourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    where?: sourcesWhereInput
  }

  /**
   * traits without action
   */
  export type traitsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
  }


  /**
   * Model sources
   */

  export type AggregateSources = {
    _count: SourcesCountAggregateOutputType | null
    _min: SourcesMinAggregateOutputType | null
    _max: SourcesMaxAggregateOutputType | null
  }

  export type SourcesMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    type: $Enums.SourceType | null
    title: string | null
    content_encrypted: Uint8Array | null
    iv: string | null
    created_at: Date | null
  }

  export type SourcesMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    type: $Enums.SourceType | null
    title: string | null
    content_encrypted: Uint8Array | null
    iv: string | null
    created_at: Date | null
  }

  export type SourcesCountAggregateOutputType = {
    id: number
    user_id: number
    type: number
    title: number
    content_encrypted: number
    iv: number
    created_at: number
    _all: number
  }


  export type SourcesMinAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    title?: true
    content_encrypted?: true
    iv?: true
    created_at?: true
  }

  export type SourcesMaxAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    title?: true
    content_encrypted?: true
    iv?: true
    created_at?: true
  }

  export type SourcesCountAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    title?: true
    content_encrypted?: true
    iv?: true
    created_at?: true
    _all?: true
  }

  export type SourcesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sources to aggregate.
     */
    where?: sourcesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sources to fetch.
     */
    orderBy?: sourcesOrderByWithRelationInput | sourcesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sourcesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sources
    **/
    _count?: true | SourcesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SourcesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SourcesMaxAggregateInputType
  }

  export type GetSourcesAggregateType<T extends SourcesAggregateArgs> = {
        [P in keyof T & keyof AggregateSources]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSources[P]>
      : GetScalarType<T[P], AggregateSources[P]>
  }




  export type sourcesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sourcesWhereInput
    orderBy?: sourcesOrderByWithAggregationInput | sourcesOrderByWithAggregationInput[]
    by: SourcesScalarFieldEnum[] | SourcesScalarFieldEnum
    having?: sourcesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SourcesCountAggregateInputType | true
    _min?: SourcesMinAggregateInputType
    _max?: SourcesMaxAggregateInputType
  }

  export type SourcesGroupByOutputType = {
    id: string
    user_id: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv: string
    created_at: Date
    _count: SourcesCountAggregateOutputType | null
    _min: SourcesMinAggregateOutputType | null
    _max: SourcesMaxAggregateOutputType | null
  }

  type GetSourcesGroupByPayload<T extends sourcesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SourcesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SourcesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SourcesGroupByOutputType[P]>
            : GetScalarType<T[P], SourcesGroupByOutputType[P]>
        }
      >
    >


  export type sourcesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    title?: boolean
    content_encrypted?: boolean
    iv?: boolean
    created_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    traits?: boolean | sources$traitsArgs<ExtArgs>
    embeddings?: boolean | sources$embeddingsArgs<ExtArgs>
    _count?: boolean | SourcesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sources"]>

  export type sourcesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    title?: boolean
    content_encrypted?: boolean
    iv?: boolean
    created_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sources"]>

  export type sourcesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    title?: boolean
    content_encrypted?: boolean
    iv?: boolean
    created_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sources"]>

  export type sourcesSelectScalar = {
    id?: boolean
    user_id?: boolean
    type?: boolean
    title?: boolean
    content_encrypted?: boolean
    iv?: boolean
    created_at?: boolean
  }

  export type sourcesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "type" | "title" | "content_encrypted" | "iv" | "created_at", ExtArgs["result"]["sources"]>
  export type sourcesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    traits?: boolean | sources$traitsArgs<ExtArgs>
    embeddings?: boolean | sources$embeddingsArgs<ExtArgs>
    _count?: boolean | SourcesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type sourcesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type sourcesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $sourcesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sources"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      traits: Prisma.$traitsPayload<ExtArgs>[]
      embeddings: Prisma.$embeddingsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      type: $Enums.SourceType
      title: string
      content_encrypted: Uint8Array
      iv: string
      created_at: Date
    }, ExtArgs["result"]["sources"]>
    composites: {}
  }

  type sourcesGetPayload<S extends boolean | null | undefined | sourcesDefaultArgs> = $Result.GetResult<Prisma.$sourcesPayload, S>

  type sourcesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sourcesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SourcesCountAggregateInputType | true
    }

  export interface sourcesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sources'], meta: { name: 'sources' } }
    /**
     * Find zero or one Sources that matches the filter.
     * @param {sourcesFindUniqueArgs} args - Arguments to find a Sources
     * @example
     * // Get one Sources
     * const sources = await prisma.sources.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sourcesFindUniqueArgs>(args: SelectSubset<T, sourcesFindUniqueArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sources that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sourcesFindUniqueOrThrowArgs} args - Arguments to find a Sources
     * @example
     * // Get one Sources
     * const sources = await prisma.sources.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sourcesFindUniqueOrThrowArgs>(args: SelectSubset<T, sourcesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sourcesFindFirstArgs} args - Arguments to find a Sources
     * @example
     * // Get one Sources
     * const sources = await prisma.sources.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sourcesFindFirstArgs>(args?: SelectSubset<T, sourcesFindFirstArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sources that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sourcesFindFirstOrThrowArgs} args - Arguments to find a Sources
     * @example
     * // Get one Sources
     * const sources = await prisma.sources.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sourcesFindFirstOrThrowArgs>(args?: SelectSubset<T, sourcesFindFirstOrThrowArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sourcesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sources
     * const sources = await prisma.sources.findMany()
     * 
     * // Get first 10 Sources
     * const sources = await prisma.sources.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sourcesWithIdOnly = await prisma.sources.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sourcesFindManyArgs>(args?: SelectSubset<T, sourcesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sources.
     * @param {sourcesCreateArgs} args - Arguments to create a Sources.
     * @example
     * // Create one Sources
     * const Sources = await prisma.sources.create({
     *   data: {
     *     // ... data to create a Sources
     *   }
     * })
     * 
     */
    create<T extends sourcesCreateArgs>(args: SelectSubset<T, sourcesCreateArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sources.
     * @param {sourcesCreateManyArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const sources = await prisma.sources.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sourcesCreateManyArgs>(args?: SelectSubset<T, sourcesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sources and returns the data saved in the database.
     * @param {sourcesCreateManyAndReturnArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const sources = await prisma.sources.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sources and only return the `id`
     * const sourcesWithIdOnly = await prisma.sources.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sourcesCreateManyAndReturnArgs>(args?: SelectSubset<T, sourcesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sources.
     * @param {sourcesDeleteArgs} args - Arguments to delete one Sources.
     * @example
     * // Delete one Sources
     * const Sources = await prisma.sources.delete({
     *   where: {
     *     // ... filter to delete one Sources
     *   }
     * })
     * 
     */
    delete<T extends sourcesDeleteArgs>(args: SelectSubset<T, sourcesDeleteArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sources.
     * @param {sourcesUpdateArgs} args - Arguments to update one Sources.
     * @example
     * // Update one Sources
     * const sources = await prisma.sources.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sourcesUpdateArgs>(args: SelectSubset<T, sourcesUpdateArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sources.
     * @param {sourcesDeleteManyArgs} args - Arguments to filter Sources to delete.
     * @example
     * // Delete a few Sources
     * const { count } = await prisma.sources.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sourcesDeleteManyArgs>(args?: SelectSubset<T, sourcesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sourcesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sources
     * const sources = await prisma.sources.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sourcesUpdateManyArgs>(args: SelectSubset<T, sourcesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources and returns the data updated in the database.
     * @param {sourcesUpdateManyAndReturnArgs} args - Arguments to update many Sources.
     * @example
     * // Update many Sources
     * const sources = await prisma.sources.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sources and only return the `id`
     * const sourcesWithIdOnly = await prisma.sources.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sourcesUpdateManyAndReturnArgs>(args: SelectSubset<T, sourcesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sources.
     * @param {sourcesUpsertArgs} args - Arguments to update or create a Sources.
     * @example
     * // Update or create a Sources
     * const sources = await prisma.sources.upsert({
     *   create: {
     *     // ... data to create a Sources
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sources we want to update
     *   }
     * })
     */
    upsert<T extends sourcesUpsertArgs>(args: SelectSubset<T, sourcesUpsertArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sourcesCountArgs} args - Arguments to filter Sources to count.
     * @example
     * // Count the number of Sources
     * const count = await prisma.sources.count({
     *   where: {
     *     // ... the filter for the Sources we want to count
     *   }
     * })
    **/
    count<T extends sourcesCountArgs>(
      args?: Subset<T, sourcesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SourcesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourcesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SourcesAggregateArgs>(args: Subset<T, SourcesAggregateArgs>): Prisma.PrismaPromise<GetSourcesAggregateType<T>>

    /**
     * Group by Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sourcesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sourcesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sourcesGroupByArgs['orderBy'] }
        : { orderBy?: sourcesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sourcesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSourcesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sources model
   */
  readonly fields: sourcesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sources.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sourcesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    traits<T extends sources$traitsArgs<ExtArgs> = {}>(args?: Subset<T, sources$traitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$traitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    embeddings<T extends sources$embeddingsArgs<ExtArgs> = {}>(args?: Subset<T, sources$embeddingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sources model
   */
  interface sourcesFieldRefs {
    readonly id: FieldRef<"sources", 'String'>
    readonly user_id: FieldRef<"sources", 'String'>
    readonly type: FieldRef<"sources", 'SourceType'>
    readonly title: FieldRef<"sources", 'String'>
    readonly content_encrypted: FieldRef<"sources", 'Bytes'>
    readonly iv: FieldRef<"sources", 'String'>
    readonly created_at: FieldRef<"sources", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sources findUnique
   */
  export type sourcesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    /**
     * Filter, which sources to fetch.
     */
    where: sourcesWhereUniqueInput
  }

  /**
   * sources findUniqueOrThrow
   */
  export type sourcesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    /**
     * Filter, which sources to fetch.
     */
    where: sourcesWhereUniqueInput
  }

  /**
   * sources findFirst
   */
  export type sourcesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    /**
     * Filter, which sources to fetch.
     */
    where?: sourcesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sources to fetch.
     */
    orderBy?: sourcesOrderByWithRelationInput | sourcesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sources.
     */
    cursor?: sourcesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sources.
     */
    distinct?: SourcesScalarFieldEnum | SourcesScalarFieldEnum[]
  }

  /**
   * sources findFirstOrThrow
   */
  export type sourcesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    /**
     * Filter, which sources to fetch.
     */
    where?: sourcesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sources to fetch.
     */
    orderBy?: sourcesOrderByWithRelationInput | sourcesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sources.
     */
    cursor?: sourcesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sources.
     */
    distinct?: SourcesScalarFieldEnum | SourcesScalarFieldEnum[]
  }

  /**
   * sources findMany
   */
  export type sourcesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    /**
     * Filter, which sources to fetch.
     */
    where?: sourcesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sources to fetch.
     */
    orderBy?: sourcesOrderByWithRelationInput | sourcesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sources.
     */
    cursor?: sourcesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sources.
     */
    skip?: number
    distinct?: SourcesScalarFieldEnum | SourcesScalarFieldEnum[]
  }

  /**
   * sources create
   */
  export type sourcesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    /**
     * The data needed to create a sources.
     */
    data: XOR<sourcesCreateInput, sourcesUncheckedCreateInput>
  }

  /**
   * sources createMany
   */
  export type sourcesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sources.
     */
    data: sourcesCreateManyInput | sourcesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sources createManyAndReturn
   */
  export type sourcesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * The data used to create many sources.
     */
    data: sourcesCreateManyInput | sourcesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * sources update
   */
  export type sourcesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    /**
     * The data needed to update a sources.
     */
    data: XOR<sourcesUpdateInput, sourcesUncheckedUpdateInput>
    /**
     * Choose, which sources to update.
     */
    where: sourcesWhereUniqueInput
  }

  /**
   * sources updateMany
   */
  export type sourcesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sources.
     */
    data: XOR<sourcesUpdateManyMutationInput, sourcesUncheckedUpdateManyInput>
    /**
     * Filter which sources to update
     */
    where?: sourcesWhereInput
    /**
     * Limit how many sources to update.
     */
    limit?: number
  }

  /**
   * sources updateManyAndReturn
   */
  export type sourcesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * The data used to update sources.
     */
    data: XOR<sourcesUpdateManyMutationInput, sourcesUncheckedUpdateManyInput>
    /**
     * Filter which sources to update
     */
    where?: sourcesWhereInput
    /**
     * Limit how many sources to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * sources upsert
   */
  export type sourcesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    /**
     * The filter to search for the sources to update in case it exists.
     */
    where: sourcesWhereUniqueInput
    /**
     * In case the sources found by the `where` argument doesn't exist, create a new sources with this data.
     */
    create: XOR<sourcesCreateInput, sourcesUncheckedCreateInput>
    /**
     * In case the sources was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sourcesUpdateInput, sourcesUncheckedUpdateInput>
  }

  /**
   * sources delete
   */
  export type sourcesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
    /**
     * Filter which sources to delete.
     */
    where: sourcesWhereUniqueInput
  }

  /**
   * sources deleteMany
   */
  export type sourcesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sources to delete
     */
    where?: sourcesWhereInput
    /**
     * Limit how many sources to delete.
     */
    limit?: number
  }

  /**
   * sources.traits
   */
  export type sources$traitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the traits
     */
    select?: traitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the traits
     */
    omit?: traitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: traitsInclude<ExtArgs> | null
    where?: traitsWhereInput
    orderBy?: traitsOrderByWithRelationInput | traitsOrderByWithRelationInput[]
    cursor?: traitsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TraitsScalarFieldEnum | TraitsScalarFieldEnum[]
  }

  /**
   * sources.embeddings
   */
  export type sources$embeddingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    where?: embeddingsWhereInput
    orderBy?: embeddingsOrderByWithRelationInput | embeddingsOrderByWithRelationInput[]
    cursor?: embeddingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmbeddingsScalarFieldEnum | EmbeddingsScalarFieldEnum[]
  }

  /**
   * sources without action
   */
  export type sourcesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sources
     */
    select?: sourcesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sources
     */
    omit?: sourcesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sourcesInclude<ExtArgs> | null
  }


  /**
   * Model messages
   */

  export type AggregateMessages = {
    _count: MessagesCountAggregateOutputType | null
    _min: MessagesMinAggregateOutputType | null
    _max: MessagesMaxAggregateOutputType | null
  }

  export type MessagesMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    role: $Enums.RoleType | null
    content_encrypted: Uint8Array | null
    iv: string | null
    audio_url: string | null
    created_at: Date | null
  }

  export type MessagesMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    role: $Enums.RoleType | null
    content_encrypted: Uint8Array | null
    iv: string | null
    audio_url: string | null
    created_at: Date | null
  }

  export type MessagesCountAggregateOutputType = {
    id: number
    user_id: number
    role: number
    content_encrypted: number
    iv: number
    audio_url: number
    created_at: number
    _all: number
  }


  export type MessagesMinAggregateInputType = {
    id?: true
    user_id?: true
    role?: true
    content_encrypted?: true
    iv?: true
    audio_url?: true
    created_at?: true
  }

  export type MessagesMaxAggregateInputType = {
    id?: true
    user_id?: true
    role?: true
    content_encrypted?: true
    iv?: true
    audio_url?: true
    created_at?: true
  }

  export type MessagesCountAggregateInputType = {
    id?: true
    user_id?: true
    role?: true
    content_encrypted?: true
    iv?: true
    audio_url?: true
    created_at?: true
    _all?: true
  }

  export type MessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which messages to aggregate.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned messages
    **/
    _count?: true | MessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessagesMaxAggregateInputType
  }

  export type GetMessagesAggregateType<T extends MessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateMessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessages[P]>
      : GetScalarType<T[P], AggregateMessages[P]>
  }




  export type messagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: messagesWhereInput
    orderBy?: messagesOrderByWithAggregationInput | messagesOrderByWithAggregationInput[]
    by: MessagesScalarFieldEnum[] | MessagesScalarFieldEnum
    having?: messagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessagesCountAggregateInputType | true
    _min?: MessagesMinAggregateInputType
    _max?: MessagesMaxAggregateInputType
  }

  export type MessagesGroupByOutputType = {
    id: string
    user_id: string
    role: $Enums.RoleType
    content_encrypted: Uint8Array
    iv: string
    audio_url: string | null
    created_at: Date
    _count: MessagesCountAggregateOutputType | null
    _min: MessagesMinAggregateOutputType | null
    _max: MessagesMaxAggregateOutputType | null
  }

  type GetMessagesGroupByPayload<T extends messagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessagesGroupByOutputType[P]>
            : GetScalarType<T[P], MessagesGroupByOutputType[P]>
        }
      >
    >


  export type messagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    role?: boolean
    content_encrypted?: boolean
    iv?: boolean
    audio_url?: boolean
    created_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type messagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    role?: boolean
    content_encrypted?: boolean
    iv?: boolean
    audio_url?: boolean
    created_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type messagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    role?: boolean
    content_encrypted?: boolean
    iv?: boolean
    audio_url?: boolean
    created_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type messagesSelectScalar = {
    id?: boolean
    user_id?: boolean
    role?: boolean
    content_encrypted?: boolean
    iv?: boolean
    audio_url?: boolean
    created_at?: boolean
  }

  export type messagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "role" | "content_encrypted" | "iv" | "audio_url" | "created_at", ExtArgs["result"]["messages"]>
  export type messagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type messagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type messagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $messagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "messages"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      role: $Enums.RoleType
      content_encrypted: Uint8Array
      iv: string
      audio_url: string | null
      created_at: Date
    }, ExtArgs["result"]["messages"]>
    composites: {}
  }

  type messagesGetPayload<S extends boolean | null | undefined | messagesDefaultArgs> = $Result.GetResult<Prisma.$messagesPayload, S>

  type messagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<messagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessagesCountAggregateInputType | true
    }

  export interface messagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['messages'], meta: { name: 'messages' } }
    /**
     * Find zero or one Messages that matches the filter.
     * @param {messagesFindUniqueArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends messagesFindUniqueArgs>(args: SelectSubset<T, messagesFindUniqueArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Messages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {messagesFindUniqueOrThrowArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends messagesFindUniqueOrThrowArgs>(args: SelectSubset<T, messagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesFindFirstArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends messagesFindFirstArgs>(args?: SelectSubset<T, messagesFindFirstArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Messages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesFindFirstOrThrowArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends messagesFindFirstOrThrowArgs>(args?: SelectSubset<T, messagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.messages.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.messages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messagesWithIdOnly = await prisma.messages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends messagesFindManyArgs>(args?: SelectSubset<T, messagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Messages.
     * @param {messagesCreateArgs} args - Arguments to create a Messages.
     * @example
     * // Create one Messages
     * const Messages = await prisma.messages.create({
     *   data: {
     *     // ... data to create a Messages
     *   }
     * })
     * 
     */
    create<T extends messagesCreateArgs>(args: SelectSubset<T, messagesCreateArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {messagesCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const messages = await prisma.messages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends messagesCreateManyArgs>(args?: SelectSubset<T, messagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {messagesCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const messages = await prisma.messages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messagesWithIdOnly = await prisma.messages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends messagesCreateManyAndReturnArgs>(args?: SelectSubset<T, messagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Messages.
     * @param {messagesDeleteArgs} args - Arguments to delete one Messages.
     * @example
     * // Delete one Messages
     * const Messages = await prisma.messages.delete({
     *   where: {
     *     // ... filter to delete one Messages
     *   }
     * })
     * 
     */
    delete<T extends messagesDeleteArgs>(args: SelectSubset<T, messagesDeleteArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Messages.
     * @param {messagesUpdateArgs} args - Arguments to update one Messages.
     * @example
     * // Update one Messages
     * const messages = await prisma.messages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends messagesUpdateArgs>(args: SelectSubset<T, messagesUpdateArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {messagesDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.messages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends messagesDeleteManyArgs>(args?: SelectSubset<T, messagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const messages = await prisma.messages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends messagesUpdateManyArgs>(args: SelectSubset<T, messagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {messagesUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const messages = await prisma.messages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messagesWithIdOnly = await prisma.messages.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends messagesUpdateManyAndReturnArgs>(args: SelectSubset<T, messagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Messages.
     * @param {messagesUpsertArgs} args - Arguments to update or create a Messages.
     * @example
     * // Update or create a Messages
     * const messages = await prisma.messages.upsert({
     *   create: {
     *     // ... data to create a Messages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Messages we want to update
     *   }
     * })
     */
    upsert<T extends messagesUpsertArgs>(args: SelectSubset<T, messagesUpsertArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.messages.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends messagesCountArgs>(
      args?: Subset<T, messagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessagesAggregateArgs>(args: Subset<T, MessagesAggregateArgs>): Prisma.PrismaPromise<GetMessagesAggregateType<T>>

    /**
     * Group by Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends messagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: messagesGroupByArgs['orderBy'] }
        : { orderBy?: messagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, messagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the messages model
   */
  readonly fields: messagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for messages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__messagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the messages model
   */
  interface messagesFieldRefs {
    readonly id: FieldRef<"messages", 'String'>
    readonly user_id: FieldRef<"messages", 'String'>
    readonly role: FieldRef<"messages", 'RoleType'>
    readonly content_encrypted: FieldRef<"messages", 'Bytes'>
    readonly iv: FieldRef<"messages", 'String'>
    readonly audio_url: FieldRef<"messages", 'String'>
    readonly created_at: FieldRef<"messages", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * messages findUnique
   */
  export type messagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages findUniqueOrThrow
   */
  export type messagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages findFirst
   */
  export type messagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for messages.
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of messages.
     */
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * messages findFirstOrThrow
   */
  export type messagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for messages.
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of messages.
     */
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * messages findMany
   */
  export type messagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing messages.
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * messages create
   */
  export type messagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * The data needed to create a messages.
     */
    data: XOR<messagesCreateInput, messagesUncheckedCreateInput>
  }

  /**
   * messages createMany
   */
  export type messagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many messages.
     */
    data: messagesCreateManyInput | messagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * messages createManyAndReturn
   */
  export type messagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * The data used to create many messages.
     */
    data: messagesCreateManyInput | messagesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * messages update
   */
  export type messagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * The data needed to update a messages.
     */
    data: XOR<messagesUpdateInput, messagesUncheckedUpdateInput>
    /**
     * Choose, which messages to update.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages updateMany
   */
  export type messagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update messages.
     */
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyInput>
    /**
     * Filter which messages to update
     */
    where?: messagesWhereInput
    /**
     * Limit how many messages to update.
     */
    limit?: number
  }

  /**
   * messages updateManyAndReturn
   */
  export type messagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * The data used to update messages.
     */
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyInput>
    /**
     * Filter which messages to update
     */
    where?: messagesWhereInput
    /**
     * Limit how many messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * messages upsert
   */
  export type messagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * The filter to search for the messages to update in case it exists.
     */
    where: messagesWhereUniqueInput
    /**
     * In case the messages found by the `where` argument doesn't exist, create a new messages with this data.
     */
    create: XOR<messagesCreateInput, messagesUncheckedCreateInput>
    /**
     * In case the messages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<messagesUpdateInput, messagesUncheckedUpdateInput>
  }

  /**
   * messages delete
   */
  export type messagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter which messages to delete.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages deleteMany
   */
  export type messagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which messages to delete
     */
    where?: messagesWhereInput
    /**
     * Limit how many messages to delete.
     */
    limit?: number
  }

  /**
   * messages without action
   */
  export type messagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
  }


  /**
   * Model embeddings
   */

  export type AggregateEmbeddings = {
    _count: EmbeddingsCountAggregateOutputType | null
    _min: EmbeddingsMinAggregateOutputType | null
    _max: EmbeddingsMaxAggregateOutputType | null
  }

  export type EmbeddingsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    vector_ref: string | null
    source_id: string | null
    category: string | null
    created_at: Date | null
  }

  export type EmbeddingsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    vector_ref: string | null
    source_id: string | null
    category: string | null
    created_at: Date | null
  }

  export type EmbeddingsCountAggregateOutputType = {
    id: number
    user_id: number
    vector_ref: number
    source_id: number
    category: number
    chunk_meta: number
    created_at: number
    _all: number
  }


  export type EmbeddingsMinAggregateInputType = {
    id?: true
    user_id?: true
    vector_ref?: true
    source_id?: true
    category?: true
    created_at?: true
  }

  export type EmbeddingsMaxAggregateInputType = {
    id?: true
    user_id?: true
    vector_ref?: true
    source_id?: true
    category?: true
    created_at?: true
  }

  export type EmbeddingsCountAggregateInputType = {
    id?: true
    user_id?: true
    vector_ref?: true
    source_id?: true
    category?: true
    chunk_meta?: true
    created_at?: true
    _all?: true
  }

  export type EmbeddingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which embeddings to aggregate.
     */
    where?: embeddingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of embeddings to fetch.
     */
    orderBy?: embeddingsOrderByWithRelationInput | embeddingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: embeddingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned embeddings
    **/
    _count?: true | EmbeddingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmbeddingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmbeddingsMaxAggregateInputType
  }

  export type GetEmbeddingsAggregateType<T extends EmbeddingsAggregateArgs> = {
        [P in keyof T & keyof AggregateEmbeddings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmbeddings[P]>
      : GetScalarType<T[P], AggregateEmbeddings[P]>
  }




  export type embeddingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: embeddingsWhereInput
    orderBy?: embeddingsOrderByWithAggregationInput | embeddingsOrderByWithAggregationInput[]
    by: EmbeddingsScalarFieldEnum[] | EmbeddingsScalarFieldEnum
    having?: embeddingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmbeddingsCountAggregateInputType | true
    _min?: EmbeddingsMinAggregateInputType
    _max?: EmbeddingsMaxAggregateInputType
  }

  export type EmbeddingsGroupByOutputType = {
    id: string
    user_id: string
    vector_ref: string
    source_id: string
    category: string
    chunk_meta: JsonValue | null
    created_at: Date
    _count: EmbeddingsCountAggregateOutputType | null
    _min: EmbeddingsMinAggregateOutputType | null
    _max: EmbeddingsMaxAggregateOutputType | null
  }

  type GetEmbeddingsGroupByPayload<T extends embeddingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmbeddingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmbeddingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmbeddingsGroupByOutputType[P]>
            : GetScalarType<T[P], EmbeddingsGroupByOutputType[P]>
        }
      >
    >


  export type embeddingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    vector_ref?: boolean
    source_id?: boolean
    category?: boolean
    chunk_meta?: boolean
    created_at?: boolean
    source?: boolean | sourcesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embeddings"]>

  export type embeddingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    vector_ref?: boolean
    source_id?: boolean
    category?: boolean
    chunk_meta?: boolean
    created_at?: boolean
    source?: boolean | sourcesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embeddings"]>

  export type embeddingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    vector_ref?: boolean
    source_id?: boolean
    category?: boolean
    chunk_meta?: boolean
    created_at?: boolean
    source?: boolean | sourcesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embeddings"]>

  export type embeddingsSelectScalar = {
    id?: boolean
    user_id?: boolean
    vector_ref?: boolean
    source_id?: boolean
    category?: boolean
    chunk_meta?: boolean
    created_at?: boolean
  }

  export type embeddingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "vector_ref" | "source_id" | "category" | "chunk_meta" | "created_at", ExtArgs["result"]["embeddings"]>
  export type embeddingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | sourcesDefaultArgs<ExtArgs>
  }
  export type embeddingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | sourcesDefaultArgs<ExtArgs>
  }
  export type embeddingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | sourcesDefaultArgs<ExtArgs>
  }

  export type $embeddingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "embeddings"
    objects: {
      source: Prisma.$sourcesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      vector_ref: string
      source_id: string
      category: string
      chunk_meta: Prisma.JsonValue | null
      created_at: Date
    }, ExtArgs["result"]["embeddings"]>
    composites: {}
  }

  type embeddingsGetPayload<S extends boolean | null | undefined | embeddingsDefaultArgs> = $Result.GetResult<Prisma.$embeddingsPayload, S>

  type embeddingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<embeddingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmbeddingsCountAggregateInputType | true
    }

  export interface embeddingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['embeddings'], meta: { name: 'embeddings' } }
    /**
     * Find zero or one Embeddings that matches the filter.
     * @param {embeddingsFindUniqueArgs} args - Arguments to find a Embeddings
     * @example
     * // Get one Embeddings
     * const embeddings = await prisma.embeddings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends embeddingsFindUniqueArgs>(args: SelectSubset<T, embeddingsFindUniqueArgs<ExtArgs>>): Prisma__embeddingsClient<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Embeddings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {embeddingsFindUniqueOrThrowArgs} args - Arguments to find a Embeddings
     * @example
     * // Get one Embeddings
     * const embeddings = await prisma.embeddings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends embeddingsFindUniqueOrThrowArgs>(args: SelectSubset<T, embeddingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__embeddingsClient<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embeddingsFindFirstArgs} args - Arguments to find a Embeddings
     * @example
     * // Get one Embeddings
     * const embeddings = await prisma.embeddings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends embeddingsFindFirstArgs>(args?: SelectSubset<T, embeddingsFindFirstArgs<ExtArgs>>): Prisma__embeddingsClient<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embeddings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embeddingsFindFirstOrThrowArgs} args - Arguments to find a Embeddings
     * @example
     * // Get one Embeddings
     * const embeddings = await prisma.embeddings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends embeddingsFindFirstOrThrowArgs>(args?: SelectSubset<T, embeddingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__embeddingsClient<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Embeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embeddingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Embeddings
     * const embeddings = await prisma.embeddings.findMany()
     * 
     * // Get first 10 Embeddings
     * const embeddings = await prisma.embeddings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const embeddingsWithIdOnly = await prisma.embeddings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends embeddingsFindManyArgs>(args?: SelectSubset<T, embeddingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Embeddings.
     * @param {embeddingsCreateArgs} args - Arguments to create a Embeddings.
     * @example
     * // Create one Embeddings
     * const Embeddings = await prisma.embeddings.create({
     *   data: {
     *     // ... data to create a Embeddings
     *   }
     * })
     * 
     */
    create<T extends embeddingsCreateArgs>(args: SelectSubset<T, embeddingsCreateArgs<ExtArgs>>): Prisma__embeddingsClient<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Embeddings.
     * @param {embeddingsCreateManyArgs} args - Arguments to create many Embeddings.
     * @example
     * // Create many Embeddings
     * const embeddings = await prisma.embeddings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends embeddingsCreateManyArgs>(args?: SelectSubset<T, embeddingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Embeddings and returns the data saved in the database.
     * @param {embeddingsCreateManyAndReturnArgs} args - Arguments to create many Embeddings.
     * @example
     * // Create many Embeddings
     * const embeddings = await prisma.embeddings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Embeddings and only return the `id`
     * const embeddingsWithIdOnly = await prisma.embeddings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends embeddingsCreateManyAndReturnArgs>(args?: SelectSubset<T, embeddingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Embeddings.
     * @param {embeddingsDeleteArgs} args - Arguments to delete one Embeddings.
     * @example
     * // Delete one Embeddings
     * const Embeddings = await prisma.embeddings.delete({
     *   where: {
     *     // ... filter to delete one Embeddings
     *   }
     * })
     * 
     */
    delete<T extends embeddingsDeleteArgs>(args: SelectSubset<T, embeddingsDeleteArgs<ExtArgs>>): Prisma__embeddingsClient<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Embeddings.
     * @param {embeddingsUpdateArgs} args - Arguments to update one Embeddings.
     * @example
     * // Update one Embeddings
     * const embeddings = await prisma.embeddings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends embeddingsUpdateArgs>(args: SelectSubset<T, embeddingsUpdateArgs<ExtArgs>>): Prisma__embeddingsClient<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Embeddings.
     * @param {embeddingsDeleteManyArgs} args - Arguments to filter Embeddings to delete.
     * @example
     * // Delete a few Embeddings
     * const { count } = await prisma.embeddings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends embeddingsDeleteManyArgs>(args?: SelectSubset<T, embeddingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Embeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embeddingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Embeddings
     * const embeddings = await prisma.embeddings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends embeddingsUpdateManyArgs>(args: SelectSubset<T, embeddingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Embeddings and returns the data updated in the database.
     * @param {embeddingsUpdateManyAndReturnArgs} args - Arguments to update many Embeddings.
     * @example
     * // Update many Embeddings
     * const embeddings = await prisma.embeddings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Embeddings and only return the `id`
     * const embeddingsWithIdOnly = await prisma.embeddings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends embeddingsUpdateManyAndReturnArgs>(args: SelectSubset<T, embeddingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Embeddings.
     * @param {embeddingsUpsertArgs} args - Arguments to update or create a Embeddings.
     * @example
     * // Update or create a Embeddings
     * const embeddings = await prisma.embeddings.upsert({
     *   create: {
     *     // ... data to create a Embeddings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Embeddings we want to update
     *   }
     * })
     */
    upsert<T extends embeddingsUpsertArgs>(args: SelectSubset<T, embeddingsUpsertArgs<ExtArgs>>): Prisma__embeddingsClient<$Result.GetResult<Prisma.$embeddingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Embeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embeddingsCountArgs} args - Arguments to filter Embeddings to count.
     * @example
     * // Count the number of Embeddings
     * const count = await prisma.embeddings.count({
     *   where: {
     *     // ... the filter for the Embeddings we want to count
     *   }
     * })
    **/
    count<T extends embeddingsCountArgs>(
      args?: Subset<T, embeddingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmbeddingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Embeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmbeddingsAggregateArgs>(args: Subset<T, EmbeddingsAggregateArgs>): Prisma.PrismaPromise<GetEmbeddingsAggregateType<T>>

    /**
     * Group by Embeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embeddingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends embeddingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: embeddingsGroupByArgs['orderBy'] }
        : { orderBy?: embeddingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, embeddingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmbeddingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the embeddings model
   */
  readonly fields: embeddingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for embeddings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__embeddingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    source<T extends sourcesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, sourcesDefaultArgs<ExtArgs>>): Prisma__sourcesClient<$Result.GetResult<Prisma.$sourcesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the embeddings model
   */
  interface embeddingsFieldRefs {
    readonly id: FieldRef<"embeddings", 'String'>
    readonly user_id: FieldRef<"embeddings", 'String'>
    readonly vector_ref: FieldRef<"embeddings", 'String'>
    readonly source_id: FieldRef<"embeddings", 'String'>
    readonly category: FieldRef<"embeddings", 'String'>
    readonly chunk_meta: FieldRef<"embeddings", 'Json'>
    readonly created_at: FieldRef<"embeddings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * embeddings findUnique
   */
  export type embeddingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    /**
     * Filter, which embeddings to fetch.
     */
    where: embeddingsWhereUniqueInput
  }

  /**
   * embeddings findUniqueOrThrow
   */
  export type embeddingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    /**
     * Filter, which embeddings to fetch.
     */
    where: embeddingsWhereUniqueInput
  }

  /**
   * embeddings findFirst
   */
  export type embeddingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    /**
     * Filter, which embeddings to fetch.
     */
    where?: embeddingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of embeddings to fetch.
     */
    orderBy?: embeddingsOrderByWithRelationInput | embeddingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for embeddings.
     */
    cursor?: embeddingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of embeddings.
     */
    distinct?: EmbeddingsScalarFieldEnum | EmbeddingsScalarFieldEnum[]
  }

  /**
   * embeddings findFirstOrThrow
   */
  export type embeddingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    /**
     * Filter, which embeddings to fetch.
     */
    where?: embeddingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of embeddings to fetch.
     */
    orderBy?: embeddingsOrderByWithRelationInput | embeddingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for embeddings.
     */
    cursor?: embeddingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of embeddings.
     */
    distinct?: EmbeddingsScalarFieldEnum | EmbeddingsScalarFieldEnum[]
  }

  /**
   * embeddings findMany
   */
  export type embeddingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    /**
     * Filter, which embeddings to fetch.
     */
    where?: embeddingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of embeddings to fetch.
     */
    orderBy?: embeddingsOrderByWithRelationInput | embeddingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing embeddings.
     */
    cursor?: embeddingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` embeddings.
     */
    skip?: number
    distinct?: EmbeddingsScalarFieldEnum | EmbeddingsScalarFieldEnum[]
  }

  /**
   * embeddings create
   */
  export type embeddingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    /**
     * The data needed to create a embeddings.
     */
    data: XOR<embeddingsCreateInput, embeddingsUncheckedCreateInput>
  }

  /**
   * embeddings createMany
   */
  export type embeddingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many embeddings.
     */
    data: embeddingsCreateManyInput | embeddingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * embeddings createManyAndReturn
   */
  export type embeddingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * The data used to create many embeddings.
     */
    data: embeddingsCreateManyInput | embeddingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * embeddings update
   */
  export type embeddingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    /**
     * The data needed to update a embeddings.
     */
    data: XOR<embeddingsUpdateInput, embeddingsUncheckedUpdateInput>
    /**
     * Choose, which embeddings to update.
     */
    where: embeddingsWhereUniqueInput
  }

  /**
   * embeddings updateMany
   */
  export type embeddingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update embeddings.
     */
    data: XOR<embeddingsUpdateManyMutationInput, embeddingsUncheckedUpdateManyInput>
    /**
     * Filter which embeddings to update
     */
    where?: embeddingsWhereInput
    /**
     * Limit how many embeddings to update.
     */
    limit?: number
  }

  /**
   * embeddings updateManyAndReturn
   */
  export type embeddingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * The data used to update embeddings.
     */
    data: XOR<embeddingsUpdateManyMutationInput, embeddingsUncheckedUpdateManyInput>
    /**
     * Filter which embeddings to update
     */
    where?: embeddingsWhereInput
    /**
     * Limit how many embeddings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * embeddings upsert
   */
  export type embeddingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    /**
     * The filter to search for the embeddings to update in case it exists.
     */
    where: embeddingsWhereUniqueInput
    /**
     * In case the embeddings found by the `where` argument doesn't exist, create a new embeddings with this data.
     */
    create: XOR<embeddingsCreateInput, embeddingsUncheckedCreateInput>
    /**
     * In case the embeddings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<embeddingsUpdateInput, embeddingsUncheckedUpdateInput>
  }

  /**
   * embeddings delete
   */
  export type embeddingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
    /**
     * Filter which embeddings to delete.
     */
    where: embeddingsWhereUniqueInput
  }

  /**
   * embeddings deleteMany
   */
  export type embeddingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which embeddings to delete
     */
    where?: embeddingsWhereInput
    /**
     * Limit how many embeddings to delete.
     */
    limit?: number
  }

  /**
   * embeddings without action
   */
  export type embeddingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embeddings
     */
    select?: embeddingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embeddings
     */
    omit?: embeddingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: embeddingsInclude<ExtArgs> | null
  }


  /**
   * Model voice_profiles
   */

  export type AggregateVoice_profiles = {
    _count: Voice_profilesCountAggregateOutputType | null
    _min: Voice_profilesMinAggregateOutputType | null
    _max: Voice_profilesMaxAggregateOutputType | null
  }

  export type Voice_profilesMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    provider: string | null
    voice_id: string | null
    consent_signed_at: Date | null
  }

  export type Voice_profilesMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    provider: string | null
    voice_id: string | null
    consent_signed_at: Date | null
  }

  export type Voice_profilesCountAggregateOutputType = {
    id: number
    user_id: number
    provider: number
    voice_id: number
    consent_signed_at: number
    sample_meta: number
    _all: number
  }


  export type Voice_profilesMinAggregateInputType = {
    id?: true
    user_id?: true
    provider?: true
    voice_id?: true
    consent_signed_at?: true
  }

  export type Voice_profilesMaxAggregateInputType = {
    id?: true
    user_id?: true
    provider?: true
    voice_id?: true
    consent_signed_at?: true
  }

  export type Voice_profilesCountAggregateInputType = {
    id?: true
    user_id?: true
    provider?: true
    voice_id?: true
    consent_signed_at?: true
    sample_meta?: true
    _all?: true
  }

  export type Voice_profilesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which voice_profiles to aggregate.
     */
    where?: voice_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voice_profiles to fetch.
     */
    orderBy?: voice_profilesOrderByWithRelationInput | voice_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: voice_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voice_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voice_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned voice_profiles
    **/
    _count?: true | Voice_profilesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Voice_profilesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Voice_profilesMaxAggregateInputType
  }

  export type GetVoice_profilesAggregateType<T extends Voice_profilesAggregateArgs> = {
        [P in keyof T & keyof AggregateVoice_profiles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoice_profiles[P]>
      : GetScalarType<T[P], AggregateVoice_profiles[P]>
  }




  export type voice_profilesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: voice_profilesWhereInput
    orderBy?: voice_profilesOrderByWithAggregationInput | voice_profilesOrderByWithAggregationInput[]
    by: Voice_profilesScalarFieldEnum[] | Voice_profilesScalarFieldEnum
    having?: voice_profilesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Voice_profilesCountAggregateInputType | true
    _min?: Voice_profilesMinAggregateInputType
    _max?: Voice_profilesMaxAggregateInputType
  }

  export type Voice_profilesGroupByOutputType = {
    id: string
    user_id: string
    provider: string
    voice_id: string
    consent_signed_at: Date | null
    sample_meta: JsonValue | null
    _count: Voice_profilesCountAggregateOutputType | null
    _min: Voice_profilesMinAggregateOutputType | null
    _max: Voice_profilesMaxAggregateOutputType | null
  }

  type GetVoice_profilesGroupByPayload<T extends voice_profilesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Voice_profilesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Voice_profilesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Voice_profilesGroupByOutputType[P]>
            : GetScalarType<T[P], Voice_profilesGroupByOutputType[P]>
        }
      >
    >


  export type voice_profilesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    provider?: boolean
    voice_id?: boolean
    consent_signed_at?: boolean
    sample_meta?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voice_profiles"]>

  export type voice_profilesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    provider?: boolean
    voice_id?: boolean
    consent_signed_at?: boolean
    sample_meta?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voice_profiles"]>

  export type voice_profilesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    provider?: boolean
    voice_id?: boolean
    consent_signed_at?: boolean
    sample_meta?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voice_profiles"]>

  export type voice_profilesSelectScalar = {
    id?: boolean
    user_id?: boolean
    provider?: boolean
    voice_id?: boolean
    consent_signed_at?: boolean
    sample_meta?: boolean
  }

  export type voice_profilesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "provider" | "voice_id" | "consent_signed_at" | "sample_meta", ExtArgs["result"]["voice_profiles"]>
  export type voice_profilesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type voice_profilesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type voice_profilesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $voice_profilesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "voice_profiles"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      provider: string
      voice_id: string
      consent_signed_at: Date | null
      sample_meta: Prisma.JsonValue | null
    }, ExtArgs["result"]["voice_profiles"]>
    composites: {}
  }

  type voice_profilesGetPayload<S extends boolean | null | undefined | voice_profilesDefaultArgs> = $Result.GetResult<Prisma.$voice_profilesPayload, S>

  type voice_profilesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<voice_profilesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Voice_profilesCountAggregateInputType | true
    }

  export interface voice_profilesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['voice_profiles'], meta: { name: 'voice_profiles' } }
    /**
     * Find zero or one Voice_profiles that matches the filter.
     * @param {voice_profilesFindUniqueArgs} args - Arguments to find a Voice_profiles
     * @example
     * // Get one Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends voice_profilesFindUniqueArgs>(args: SelectSubset<T, voice_profilesFindUniqueArgs<ExtArgs>>): Prisma__voice_profilesClient<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Voice_profiles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {voice_profilesFindUniqueOrThrowArgs} args - Arguments to find a Voice_profiles
     * @example
     * // Get one Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends voice_profilesFindUniqueOrThrowArgs>(args: SelectSubset<T, voice_profilesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__voice_profilesClient<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Voice_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_profilesFindFirstArgs} args - Arguments to find a Voice_profiles
     * @example
     * // Get one Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends voice_profilesFindFirstArgs>(args?: SelectSubset<T, voice_profilesFindFirstArgs<ExtArgs>>): Prisma__voice_profilesClient<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Voice_profiles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_profilesFindFirstOrThrowArgs} args - Arguments to find a Voice_profiles
     * @example
     * // Get one Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends voice_profilesFindFirstOrThrowArgs>(args?: SelectSubset<T, voice_profilesFindFirstOrThrowArgs<ExtArgs>>): Prisma__voice_profilesClient<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Voice_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_profilesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.findMany()
     * 
     * // Get first 10 Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voice_profilesWithIdOnly = await prisma.voice_profiles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends voice_profilesFindManyArgs>(args?: SelectSubset<T, voice_profilesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Voice_profiles.
     * @param {voice_profilesCreateArgs} args - Arguments to create a Voice_profiles.
     * @example
     * // Create one Voice_profiles
     * const Voice_profiles = await prisma.voice_profiles.create({
     *   data: {
     *     // ... data to create a Voice_profiles
     *   }
     * })
     * 
     */
    create<T extends voice_profilesCreateArgs>(args: SelectSubset<T, voice_profilesCreateArgs<ExtArgs>>): Prisma__voice_profilesClient<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Voice_profiles.
     * @param {voice_profilesCreateManyArgs} args - Arguments to create many Voice_profiles.
     * @example
     * // Create many Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends voice_profilesCreateManyArgs>(args?: SelectSubset<T, voice_profilesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Voice_profiles and returns the data saved in the database.
     * @param {voice_profilesCreateManyAndReturnArgs} args - Arguments to create many Voice_profiles.
     * @example
     * // Create many Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Voice_profiles and only return the `id`
     * const voice_profilesWithIdOnly = await prisma.voice_profiles.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends voice_profilesCreateManyAndReturnArgs>(args?: SelectSubset<T, voice_profilesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Voice_profiles.
     * @param {voice_profilesDeleteArgs} args - Arguments to delete one Voice_profiles.
     * @example
     * // Delete one Voice_profiles
     * const Voice_profiles = await prisma.voice_profiles.delete({
     *   where: {
     *     // ... filter to delete one Voice_profiles
     *   }
     * })
     * 
     */
    delete<T extends voice_profilesDeleteArgs>(args: SelectSubset<T, voice_profilesDeleteArgs<ExtArgs>>): Prisma__voice_profilesClient<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Voice_profiles.
     * @param {voice_profilesUpdateArgs} args - Arguments to update one Voice_profiles.
     * @example
     * // Update one Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends voice_profilesUpdateArgs>(args: SelectSubset<T, voice_profilesUpdateArgs<ExtArgs>>): Prisma__voice_profilesClient<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Voice_profiles.
     * @param {voice_profilesDeleteManyArgs} args - Arguments to filter Voice_profiles to delete.
     * @example
     * // Delete a few Voice_profiles
     * const { count } = await prisma.voice_profiles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends voice_profilesDeleteManyArgs>(args?: SelectSubset<T, voice_profilesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Voice_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_profilesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends voice_profilesUpdateManyArgs>(args: SelectSubset<T, voice_profilesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Voice_profiles and returns the data updated in the database.
     * @param {voice_profilesUpdateManyAndReturnArgs} args - Arguments to update many Voice_profiles.
     * @example
     * // Update many Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Voice_profiles and only return the `id`
     * const voice_profilesWithIdOnly = await prisma.voice_profiles.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends voice_profilesUpdateManyAndReturnArgs>(args: SelectSubset<T, voice_profilesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Voice_profiles.
     * @param {voice_profilesUpsertArgs} args - Arguments to update or create a Voice_profiles.
     * @example
     * // Update or create a Voice_profiles
     * const voice_profiles = await prisma.voice_profiles.upsert({
     *   create: {
     *     // ... data to create a Voice_profiles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Voice_profiles we want to update
     *   }
     * })
     */
    upsert<T extends voice_profilesUpsertArgs>(args: SelectSubset<T, voice_profilesUpsertArgs<ExtArgs>>): Prisma__voice_profilesClient<$Result.GetResult<Prisma.$voice_profilesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Voice_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_profilesCountArgs} args - Arguments to filter Voice_profiles to count.
     * @example
     * // Count the number of Voice_profiles
     * const count = await prisma.voice_profiles.count({
     *   where: {
     *     // ... the filter for the Voice_profiles we want to count
     *   }
     * })
    **/
    count<T extends voice_profilesCountArgs>(
      args?: Subset<T, voice_profilesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Voice_profilesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Voice_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Voice_profilesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Voice_profilesAggregateArgs>(args: Subset<T, Voice_profilesAggregateArgs>): Prisma.PrismaPromise<GetVoice_profilesAggregateType<T>>

    /**
     * Group by Voice_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {voice_profilesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends voice_profilesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: voice_profilesGroupByArgs['orderBy'] }
        : { orderBy?: voice_profilesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, voice_profilesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoice_profilesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the voice_profiles model
   */
  readonly fields: voice_profilesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for voice_profiles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__voice_profilesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the voice_profiles model
   */
  interface voice_profilesFieldRefs {
    readonly id: FieldRef<"voice_profiles", 'String'>
    readonly user_id: FieldRef<"voice_profiles", 'String'>
    readonly provider: FieldRef<"voice_profiles", 'String'>
    readonly voice_id: FieldRef<"voice_profiles", 'String'>
    readonly consent_signed_at: FieldRef<"voice_profiles", 'DateTime'>
    readonly sample_meta: FieldRef<"voice_profiles", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * voice_profiles findUnique
   */
  export type voice_profilesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    /**
     * Filter, which voice_profiles to fetch.
     */
    where: voice_profilesWhereUniqueInput
  }

  /**
   * voice_profiles findUniqueOrThrow
   */
  export type voice_profilesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    /**
     * Filter, which voice_profiles to fetch.
     */
    where: voice_profilesWhereUniqueInput
  }

  /**
   * voice_profiles findFirst
   */
  export type voice_profilesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    /**
     * Filter, which voice_profiles to fetch.
     */
    where?: voice_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voice_profiles to fetch.
     */
    orderBy?: voice_profilesOrderByWithRelationInput | voice_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for voice_profiles.
     */
    cursor?: voice_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voice_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voice_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of voice_profiles.
     */
    distinct?: Voice_profilesScalarFieldEnum | Voice_profilesScalarFieldEnum[]
  }

  /**
   * voice_profiles findFirstOrThrow
   */
  export type voice_profilesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    /**
     * Filter, which voice_profiles to fetch.
     */
    where?: voice_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voice_profiles to fetch.
     */
    orderBy?: voice_profilesOrderByWithRelationInput | voice_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for voice_profiles.
     */
    cursor?: voice_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voice_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voice_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of voice_profiles.
     */
    distinct?: Voice_profilesScalarFieldEnum | Voice_profilesScalarFieldEnum[]
  }

  /**
   * voice_profiles findMany
   */
  export type voice_profilesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    /**
     * Filter, which voice_profiles to fetch.
     */
    where?: voice_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voice_profiles to fetch.
     */
    orderBy?: voice_profilesOrderByWithRelationInput | voice_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing voice_profiles.
     */
    cursor?: voice_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voice_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voice_profiles.
     */
    skip?: number
    distinct?: Voice_profilesScalarFieldEnum | Voice_profilesScalarFieldEnum[]
  }

  /**
   * voice_profiles create
   */
  export type voice_profilesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    /**
     * The data needed to create a voice_profiles.
     */
    data: XOR<voice_profilesCreateInput, voice_profilesUncheckedCreateInput>
  }

  /**
   * voice_profiles createMany
   */
  export type voice_profilesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many voice_profiles.
     */
    data: voice_profilesCreateManyInput | voice_profilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * voice_profiles createManyAndReturn
   */
  export type voice_profilesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * The data used to create many voice_profiles.
     */
    data: voice_profilesCreateManyInput | voice_profilesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * voice_profiles update
   */
  export type voice_profilesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    /**
     * The data needed to update a voice_profiles.
     */
    data: XOR<voice_profilesUpdateInput, voice_profilesUncheckedUpdateInput>
    /**
     * Choose, which voice_profiles to update.
     */
    where: voice_profilesWhereUniqueInput
  }

  /**
   * voice_profiles updateMany
   */
  export type voice_profilesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update voice_profiles.
     */
    data: XOR<voice_profilesUpdateManyMutationInput, voice_profilesUncheckedUpdateManyInput>
    /**
     * Filter which voice_profiles to update
     */
    where?: voice_profilesWhereInput
    /**
     * Limit how many voice_profiles to update.
     */
    limit?: number
  }

  /**
   * voice_profiles updateManyAndReturn
   */
  export type voice_profilesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * The data used to update voice_profiles.
     */
    data: XOR<voice_profilesUpdateManyMutationInput, voice_profilesUncheckedUpdateManyInput>
    /**
     * Filter which voice_profiles to update
     */
    where?: voice_profilesWhereInput
    /**
     * Limit how many voice_profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * voice_profiles upsert
   */
  export type voice_profilesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    /**
     * The filter to search for the voice_profiles to update in case it exists.
     */
    where: voice_profilesWhereUniqueInput
    /**
     * In case the voice_profiles found by the `where` argument doesn't exist, create a new voice_profiles with this data.
     */
    create: XOR<voice_profilesCreateInput, voice_profilesUncheckedCreateInput>
    /**
     * In case the voice_profiles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<voice_profilesUpdateInput, voice_profilesUncheckedUpdateInput>
  }

  /**
   * voice_profiles delete
   */
  export type voice_profilesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
    /**
     * Filter which voice_profiles to delete.
     */
    where: voice_profilesWhereUniqueInput
  }

  /**
   * voice_profiles deleteMany
   */
  export type voice_profilesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which voice_profiles to delete
     */
    where?: voice_profilesWhereInput
    /**
     * Limit how many voice_profiles to delete.
     */
    limit?: number
  }

  /**
   * voice_profiles without action
   */
  export type voice_profilesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voice_profiles
     */
    select?: voice_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voice_profiles
     */
    omit?: voice_profilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: voice_profilesInclude<ExtArgs> | null
  }


  /**
   * Model embedding_jobs
   */

  export type AggregateEmbedding_jobs = {
    _count: Embedding_jobsCountAggregateOutputType | null
    _min: Embedding_jobsMinAggregateOutputType | null
    _max: Embedding_jobsMaxAggregateOutputType | null
  }

  export type Embedding_jobsMinAggregateOutputType = {
    id: string | null
    job_id: string | null
    user_id: string | null
    source_id: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Embedding_jobsMaxAggregateOutputType = {
    id: string | null
    job_id: string | null
    user_id: string | null
    source_id: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Embedding_jobsCountAggregateOutputType = {
    id: number
    job_id: number
    user_id: number
    source_id: number
    status: number
    result: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Embedding_jobsMinAggregateInputType = {
    id?: true
    job_id?: true
    user_id?: true
    source_id?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type Embedding_jobsMaxAggregateInputType = {
    id?: true
    job_id?: true
    user_id?: true
    source_id?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type Embedding_jobsCountAggregateInputType = {
    id?: true
    job_id?: true
    user_id?: true
    source_id?: true
    status?: true
    result?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Embedding_jobsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which embedding_jobs to aggregate.
     */
    where?: embedding_jobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of embedding_jobs to fetch.
     */
    orderBy?: embedding_jobsOrderByWithRelationInput | embedding_jobsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: embedding_jobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` embedding_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` embedding_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned embedding_jobs
    **/
    _count?: true | Embedding_jobsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Embedding_jobsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Embedding_jobsMaxAggregateInputType
  }

  export type GetEmbedding_jobsAggregateType<T extends Embedding_jobsAggregateArgs> = {
        [P in keyof T & keyof AggregateEmbedding_jobs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmbedding_jobs[P]>
      : GetScalarType<T[P], AggregateEmbedding_jobs[P]>
  }




  export type embedding_jobsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: embedding_jobsWhereInput
    orderBy?: embedding_jobsOrderByWithAggregationInput | embedding_jobsOrderByWithAggregationInput[]
    by: Embedding_jobsScalarFieldEnum[] | Embedding_jobsScalarFieldEnum
    having?: embedding_jobsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Embedding_jobsCountAggregateInputType | true
    _min?: Embedding_jobsMinAggregateInputType
    _max?: Embedding_jobsMaxAggregateInputType
  }

  export type Embedding_jobsGroupByOutputType = {
    id: string
    job_id: string
    user_id: string | null
    source_id: string | null
    status: string
    result: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: Embedding_jobsCountAggregateOutputType | null
    _min: Embedding_jobsMinAggregateOutputType | null
    _max: Embedding_jobsMaxAggregateOutputType | null
  }

  type GetEmbedding_jobsGroupByPayload<T extends embedding_jobsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Embedding_jobsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Embedding_jobsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Embedding_jobsGroupByOutputType[P]>
            : GetScalarType<T[P], Embedding_jobsGroupByOutputType[P]>
        }
      >
    >


  export type embedding_jobsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_id?: boolean
    user_id?: boolean
    source_id?: boolean
    status?: boolean
    result?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["embedding_jobs"]>

  export type embedding_jobsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_id?: boolean
    user_id?: boolean
    source_id?: boolean
    status?: boolean
    result?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["embedding_jobs"]>

  export type embedding_jobsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_id?: boolean
    user_id?: boolean
    source_id?: boolean
    status?: boolean
    result?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["embedding_jobs"]>

  export type embedding_jobsSelectScalar = {
    id?: boolean
    job_id?: boolean
    user_id?: boolean
    source_id?: boolean
    status?: boolean
    result?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type embedding_jobsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "job_id" | "user_id" | "source_id" | "status" | "result" | "created_at" | "updated_at", ExtArgs["result"]["embedding_jobs"]>

  export type $embedding_jobsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "embedding_jobs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      job_id: string
      user_id: string | null
      source_id: string | null
      status: string
      result: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["embedding_jobs"]>
    composites: {}
  }

  type embedding_jobsGetPayload<S extends boolean | null | undefined | embedding_jobsDefaultArgs> = $Result.GetResult<Prisma.$embedding_jobsPayload, S>

  type embedding_jobsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<embedding_jobsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Embedding_jobsCountAggregateInputType | true
    }

  export interface embedding_jobsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['embedding_jobs'], meta: { name: 'embedding_jobs' } }
    /**
     * Find zero or one Embedding_jobs that matches the filter.
     * @param {embedding_jobsFindUniqueArgs} args - Arguments to find a Embedding_jobs
     * @example
     * // Get one Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends embedding_jobsFindUniqueArgs>(args: SelectSubset<T, embedding_jobsFindUniqueArgs<ExtArgs>>): Prisma__embedding_jobsClient<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Embedding_jobs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {embedding_jobsFindUniqueOrThrowArgs} args - Arguments to find a Embedding_jobs
     * @example
     * // Get one Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends embedding_jobsFindUniqueOrThrowArgs>(args: SelectSubset<T, embedding_jobsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__embedding_jobsClient<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embedding_jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embedding_jobsFindFirstArgs} args - Arguments to find a Embedding_jobs
     * @example
     * // Get one Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends embedding_jobsFindFirstArgs>(args?: SelectSubset<T, embedding_jobsFindFirstArgs<ExtArgs>>): Prisma__embedding_jobsClient<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embedding_jobs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embedding_jobsFindFirstOrThrowArgs} args - Arguments to find a Embedding_jobs
     * @example
     * // Get one Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends embedding_jobsFindFirstOrThrowArgs>(args?: SelectSubset<T, embedding_jobsFindFirstOrThrowArgs<ExtArgs>>): Prisma__embedding_jobsClient<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Embedding_jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embedding_jobsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.findMany()
     * 
     * // Get first 10 Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const embedding_jobsWithIdOnly = await prisma.embedding_jobs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends embedding_jobsFindManyArgs>(args?: SelectSubset<T, embedding_jobsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Embedding_jobs.
     * @param {embedding_jobsCreateArgs} args - Arguments to create a Embedding_jobs.
     * @example
     * // Create one Embedding_jobs
     * const Embedding_jobs = await prisma.embedding_jobs.create({
     *   data: {
     *     // ... data to create a Embedding_jobs
     *   }
     * })
     * 
     */
    create<T extends embedding_jobsCreateArgs>(args: SelectSubset<T, embedding_jobsCreateArgs<ExtArgs>>): Prisma__embedding_jobsClient<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Embedding_jobs.
     * @param {embedding_jobsCreateManyArgs} args - Arguments to create many Embedding_jobs.
     * @example
     * // Create many Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends embedding_jobsCreateManyArgs>(args?: SelectSubset<T, embedding_jobsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Embedding_jobs and returns the data saved in the database.
     * @param {embedding_jobsCreateManyAndReturnArgs} args - Arguments to create many Embedding_jobs.
     * @example
     * // Create many Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Embedding_jobs and only return the `id`
     * const embedding_jobsWithIdOnly = await prisma.embedding_jobs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends embedding_jobsCreateManyAndReturnArgs>(args?: SelectSubset<T, embedding_jobsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Embedding_jobs.
     * @param {embedding_jobsDeleteArgs} args - Arguments to delete one Embedding_jobs.
     * @example
     * // Delete one Embedding_jobs
     * const Embedding_jobs = await prisma.embedding_jobs.delete({
     *   where: {
     *     // ... filter to delete one Embedding_jobs
     *   }
     * })
     * 
     */
    delete<T extends embedding_jobsDeleteArgs>(args: SelectSubset<T, embedding_jobsDeleteArgs<ExtArgs>>): Prisma__embedding_jobsClient<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Embedding_jobs.
     * @param {embedding_jobsUpdateArgs} args - Arguments to update one Embedding_jobs.
     * @example
     * // Update one Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends embedding_jobsUpdateArgs>(args: SelectSubset<T, embedding_jobsUpdateArgs<ExtArgs>>): Prisma__embedding_jobsClient<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Embedding_jobs.
     * @param {embedding_jobsDeleteManyArgs} args - Arguments to filter Embedding_jobs to delete.
     * @example
     * // Delete a few Embedding_jobs
     * const { count } = await prisma.embedding_jobs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends embedding_jobsDeleteManyArgs>(args?: SelectSubset<T, embedding_jobsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Embedding_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embedding_jobsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends embedding_jobsUpdateManyArgs>(args: SelectSubset<T, embedding_jobsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Embedding_jobs and returns the data updated in the database.
     * @param {embedding_jobsUpdateManyAndReturnArgs} args - Arguments to update many Embedding_jobs.
     * @example
     * // Update many Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Embedding_jobs and only return the `id`
     * const embedding_jobsWithIdOnly = await prisma.embedding_jobs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends embedding_jobsUpdateManyAndReturnArgs>(args: SelectSubset<T, embedding_jobsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Embedding_jobs.
     * @param {embedding_jobsUpsertArgs} args - Arguments to update or create a Embedding_jobs.
     * @example
     * // Update or create a Embedding_jobs
     * const embedding_jobs = await prisma.embedding_jobs.upsert({
     *   create: {
     *     // ... data to create a Embedding_jobs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Embedding_jobs we want to update
     *   }
     * })
     */
    upsert<T extends embedding_jobsUpsertArgs>(args: SelectSubset<T, embedding_jobsUpsertArgs<ExtArgs>>): Prisma__embedding_jobsClient<$Result.GetResult<Prisma.$embedding_jobsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Embedding_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embedding_jobsCountArgs} args - Arguments to filter Embedding_jobs to count.
     * @example
     * // Count the number of Embedding_jobs
     * const count = await prisma.embedding_jobs.count({
     *   where: {
     *     // ... the filter for the Embedding_jobs we want to count
     *   }
     * })
    **/
    count<T extends embedding_jobsCountArgs>(
      args?: Subset<T, embedding_jobsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Embedding_jobsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Embedding_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Embedding_jobsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Embedding_jobsAggregateArgs>(args: Subset<T, Embedding_jobsAggregateArgs>): Prisma.PrismaPromise<GetEmbedding_jobsAggregateType<T>>

    /**
     * Group by Embedding_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {embedding_jobsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends embedding_jobsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: embedding_jobsGroupByArgs['orderBy'] }
        : { orderBy?: embedding_jobsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, embedding_jobsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmbedding_jobsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the embedding_jobs model
   */
  readonly fields: embedding_jobsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for embedding_jobs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__embedding_jobsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the embedding_jobs model
   */
  interface embedding_jobsFieldRefs {
    readonly id: FieldRef<"embedding_jobs", 'String'>
    readonly job_id: FieldRef<"embedding_jobs", 'String'>
    readonly user_id: FieldRef<"embedding_jobs", 'String'>
    readonly source_id: FieldRef<"embedding_jobs", 'String'>
    readonly status: FieldRef<"embedding_jobs", 'String'>
    readonly result: FieldRef<"embedding_jobs", 'Json'>
    readonly created_at: FieldRef<"embedding_jobs", 'DateTime'>
    readonly updated_at: FieldRef<"embedding_jobs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * embedding_jobs findUnique
   */
  export type embedding_jobsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * Filter, which embedding_jobs to fetch.
     */
    where: embedding_jobsWhereUniqueInput
  }

  /**
   * embedding_jobs findUniqueOrThrow
   */
  export type embedding_jobsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * Filter, which embedding_jobs to fetch.
     */
    where: embedding_jobsWhereUniqueInput
  }

  /**
   * embedding_jobs findFirst
   */
  export type embedding_jobsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * Filter, which embedding_jobs to fetch.
     */
    where?: embedding_jobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of embedding_jobs to fetch.
     */
    orderBy?: embedding_jobsOrderByWithRelationInput | embedding_jobsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for embedding_jobs.
     */
    cursor?: embedding_jobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` embedding_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` embedding_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of embedding_jobs.
     */
    distinct?: Embedding_jobsScalarFieldEnum | Embedding_jobsScalarFieldEnum[]
  }

  /**
   * embedding_jobs findFirstOrThrow
   */
  export type embedding_jobsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * Filter, which embedding_jobs to fetch.
     */
    where?: embedding_jobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of embedding_jobs to fetch.
     */
    orderBy?: embedding_jobsOrderByWithRelationInput | embedding_jobsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for embedding_jobs.
     */
    cursor?: embedding_jobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` embedding_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` embedding_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of embedding_jobs.
     */
    distinct?: Embedding_jobsScalarFieldEnum | Embedding_jobsScalarFieldEnum[]
  }

  /**
   * embedding_jobs findMany
   */
  export type embedding_jobsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * Filter, which embedding_jobs to fetch.
     */
    where?: embedding_jobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of embedding_jobs to fetch.
     */
    orderBy?: embedding_jobsOrderByWithRelationInput | embedding_jobsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing embedding_jobs.
     */
    cursor?: embedding_jobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` embedding_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` embedding_jobs.
     */
    skip?: number
    distinct?: Embedding_jobsScalarFieldEnum | Embedding_jobsScalarFieldEnum[]
  }

  /**
   * embedding_jobs create
   */
  export type embedding_jobsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * The data needed to create a embedding_jobs.
     */
    data: XOR<embedding_jobsCreateInput, embedding_jobsUncheckedCreateInput>
  }

  /**
   * embedding_jobs createMany
   */
  export type embedding_jobsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many embedding_jobs.
     */
    data: embedding_jobsCreateManyInput | embedding_jobsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * embedding_jobs createManyAndReturn
   */
  export type embedding_jobsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * The data used to create many embedding_jobs.
     */
    data: embedding_jobsCreateManyInput | embedding_jobsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * embedding_jobs update
   */
  export type embedding_jobsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * The data needed to update a embedding_jobs.
     */
    data: XOR<embedding_jobsUpdateInput, embedding_jobsUncheckedUpdateInput>
    /**
     * Choose, which embedding_jobs to update.
     */
    where: embedding_jobsWhereUniqueInput
  }

  /**
   * embedding_jobs updateMany
   */
  export type embedding_jobsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update embedding_jobs.
     */
    data: XOR<embedding_jobsUpdateManyMutationInput, embedding_jobsUncheckedUpdateManyInput>
    /**
     * Filter which embedding_jobs to update
     */
    where?: embedding_jobsWhereInput
    /**
     * Limit how many embedding_jobs to update.
     */
    limit?: number
  }

  /**
   * embedding_jobs updateManyAndReturn
   */
  export type embedding_jobsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * The data used to update embedding_jobs.
     */
    data: XOR<embedding_jobsUpdateManyMutationInput, embedding_jobsUncheckedUpdateManyInput>
    /**
     * Filter which embedding_jobs to update
     */
    where?: embedding_jobsWhereInput
    /**
     * Limit how many embedding_jobs to update.
     */
    limit?: number
  }

  /**
   * embedding_jobs upsert
   */
  export type embedding_jobsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * The filter to search for the embedding_jobs to update in case it exists.
     */
    where: embedding_jobsWhereUniqueInput
    /**
     * In case the embedding_jobs found by the `where` argument doesn't exist, create a new embedding_jobs with this data.
     */
    create: XOR<embedding_jobsCreateInput, embedding_jobsUncheckedCreateInput>
    /**
     * In case the embedding_jobs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<embedding_jobsUpdateInput, embedding_jobsUncheckedUpdateInput>
  }

  /**
   * embedding_jobs delete
   */
  export type embedding_jobsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
    /**
     * Filter which embedding_jobs to delete.
     */
    where: embedding_jobsWhereUniqueInput
  }

  /**
   * embedding_jobs deleteMany
   */
  export type embedding_jobsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which embedding_jobs to delete
     */
    where?: embedding_jobsWhereInput
    /**
     * Limit how many embedding_jobs to delete.
     */
    limit?: number
  }

  /**
   * embedding_jobs without action
   */
  export type embedding_jobsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the embedding_jobs
     */
    select?: embedding_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the embedding_jobs
     */
    omit?: embedding_jobsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const CredentialsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    webauthn_credential_id: 'webauthn_credential_id',
    public_key: 'public_key',
    sign_count: 'sign_count',
    created_at: 'created_at'
  };

  export type CredentialsScalarFieldEnum = (typeof CredentialsScalarFieldEnum)[keyof typeof CredentialsScalarFieldEnum]


  export const SessionsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    hashed_token: 'hashed_token',
    user_agent: 'user_agent',
    ip_hash: 'ip_hash',
    created_at: 'created_at',
    expires_at: 'expires_at',
    revoked_at: 'revoked_at'
  };

  export type SessionsScalarFieldEnum = (typeof SessionsScalarFieldEnum)[keyof typeof SessionsScalarFieldEnum]


  export const ProfilesScalarFieldEnum: {
    user_id: 'user_id',
    display_name: 'display_name',
    timezone: 'timezone',
    theme_color: 'theme_color',
    updated_at: 'updated_at'
  };

  export type ProfilesScalarFieldEnum = (typeof ProfilesScalarFieldEnum)[keyof typeof ProfilesScalarFieldEnum]


  export const TraitsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    category: 'category',
    key: 'key',
    value_json: 'value_json',
    confidence: 'confidence',
    completeness: 'completeness',
    provenance: 'provenance',
    updated_at: 'updated_at',
    source_id: 'source_id'
  };

  export type TraitsScalarFieldEnum = (typeof TraitsScalarFieldEnum)[keyof typeof TraitsScalarFieldEnum]


  export const SourcesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    type: 'type',
    title: 'title',
    content_encrypted: 'content_encrypted',
    iv: 'iv',
    created_at: 'created_at'
  };

  export type SourcesScalarFieldEnum = (typeof SourcesScalarFieldEnum)[keyof typeof SourcesScalarFieldEnum]


  export const MessagesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    role: 'role',
    content_encrypted: 'content_encrypted',
    iv: 'iv',
    audio_url: 'audio_url',
    created_at: 'created_at'
  };

  export type MessagesScalarFieldEnum = (typeof MessagesScalarFieldEnum)[keyof typeof MessagesScalarFieldEnum]


  export const EmbeddingsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    vector_ref: 'vector_ref',
    source_id: 'source_id',
    category: 'category',
    chunk_meta: 'chunk_meta',
    created_at: 'created_at'
  };

  export type EmbeddingsScalarFieldEnum = (typeof EmbeddingsScalarFieldEnum)[keyof typeof EmbeddingsScalarFieldEnum]


  export const Voice_profilesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    provider: 'provider',
    voice_id: 'voice_id',
    consent_signed_at: 'consent_signed_at',
    sample_meta: 'sample_meta'
  };

  export type Voice_profilesScalarFieldEnum = (typeof Voice_profilesScalarFieldEnum)[keyof typeof Voice_profilesScalarFieldEnum]


  export const Embedding_jobsScalarFieldEnum: {
    id: 'id',
    job_id: 'job_id',
    user_id: 'user_id',
    source_id: 'source_id',
    status: 'status',
    result: 'result',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Embedding_jobsScalarFieldEnum = (typeof Embedding_jobsScalarFieldEnum)[keyof typeof Embedding_jobsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'SourceType'
   */
  export type EnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType'>
    


  /**
   * Reference to a field of type 'SourceType[]'
   */
  export type ListEnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType[]'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    


  /**
   * Reference to a field of type 'RoleType'
   */
  export type EnumRoleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleType'>
    


  /**
   * Reference to a field of type 'RoleType[]'
   */
  export type ListEnumRoleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleType[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    credentials?: CredentialsListRelationFilter
    sessions?: SessionsListRelationFilter
    profiles?: XOR<ProfilesNullableScalarRelationFilter, profilesWhereInput> | null
    traits?: TraitsListRelationFilter
    sources?: SourcesListRelationFilter
    messages?: MessagesListRelationFilter
    voice_profiles?: Voice_profilesListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    credentials?: credentialsOrderByRelationAggregateInput
    sessions?: sessionsOrderByRelationAggregateInput
    profiles?: profilesOrderByWithRelationInput
    traits?: traitsOrderByRelationAggregateInput
    sources?: sourcesOrderByRelationAggregateInput
    messages?: messagesOrderByRelationAggregateInput
    voice_profiles?: voice_profilesOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    created_at?: DateTimeFilter<"users"> | Date | string
    credentials?: CredentialsListRelationFilter
    sessions?: SessionsListRelationFilter
    profiles?: XOR<ProfilesNullableScalarRelationFilter, profilesWhereInput> | null
    traits?: TraitsListRelationFilter
    sources?: SourcesListRelationFilter
    messages?: MessagesListRelationFilter
    voice_profiles?: Voice_profilesListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type credentialsWhereInput = {
    AND?: credentialsWhereInput | credentialsWhereInput[]
    OR?: credentialsWhereInput[]
    NOT?: credentialsWhereInput | credentialsWhereInput[]
    id?: StringFilter<"credentials"> | string
    user_id?: StringFilter<"credentials"> | string
    webauthn_credential_id?: StringFilter<"credentials"> | string
    public_key?: StringFilter<"credentials"> | string
    sign_count?: IntFilter<"credentials"> | number
    created_at?: DateTimeFilter<"credentials"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type credentialsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    webauthn_credential_id?: SortOrder
    public_key?: SortOrder
    sign_count?: SortOrder
    created_at?: SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type credentialsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    webauthn_credential_id?: string
    AND?: credentialsWhereInput | credentialsWhereInput[]
    OR?: credentialsWhereInput[]
    NOT?: credentialsWhereInput | credentialsWhereInput[]
    user_id?: StringFilter<"credentials"> | string
    public_key?: StringFilter<"credentials"> | string
    sign_count?: IntFilter<"credentials"> | number
    created_at?: DateTimeFilter<"credentials"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "webauthn_credential_id">

  export type credentialsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    webauthn_credential_id?: SortOrder
    public_key?: SortOrder
    sign_count?: SortOrder
    created_at?: SortOrder
    _count?: credentialsCountOrderByAggregateInput
    _avg?: credentialsAvgOrderByAggregateInput
    _max?: credentialsMaxOrderByAggregateInput
    _min?: credentialsMinOrderByAggregateInput
    _sum?: credentialsSumOrderByAggregateInput
  }

  export type credentialsScalarWhereWithAggregatesInput = {
    AND?: credentialsScalarWhereWithAggregatesInput | credentialsScalarWhereWithAggregatesInput[]
    OR?: credentialsScalarWhereWithAggregatesInput[]
    NOT?: credentialsScalarWhereWithAggregatesInput | credentialsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"credentials"> | string
    user_id?: StringWithAggregatesFilter<"credentials"> | string
    webauthn_credential_id?: StringWithAggregatesFilter<"credentials"> | string
    public_key?: StringWithAggregatesFilter<"credentials"> | string
    sign_count?: IntWithAggregatesFilter<"credentials"> | number
    created_at?: DateTimeWithAggregatesFilter<"credentials"> | Date | string
  }

  export type sessionsWhereInput = {
    AND?: sessionsWhereInput | sessionsWhereInput[]
    OR?: sessionsWhereInput[]
    NOT?: sessionsWhereInput | sessionsWhereInput[]
    id?: StringFilter<"sessions"> | string
    user_id?: StringFilter<"sessions"> | string
    hashed_token?: StringFilter<"sessions"> | string
    user_agent?: StringFilter<"sessions"> | string
    ip_hash?: StringFilter<"sessions"> | string
    created_at?: DateTimeFilter<"sessions"> | Date | string
    expires_at?: DateTimeFilter<"sessions"> | Date | string
    revoked_at?: DateTimeNullableFilter<"sessions"> | Date | string | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type sessionsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    hashed_token?: SortOrder
    user_agent?: SortOrder
    ip_hash?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type sessionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: sessionsWhereInput | sessionsWhereInput[]
    OR?: sessionsWhereInput[]
    NOT?: sessionsWhereInput | sessionsWhereInput[]
    user_id?: StringFilter<"sessions"> | string
    hashed_token?: StringFilter<"sessions"> | string
    user_agent?: StringFilter<"sessions"> | string
    ip_hash?: StringFilter<"sessions"> | string
    created_at?: DateTimeFilter<"sessions"> | Date | string
    expires_at?: DateTimeFilter<"sessions"> | Date | string
    revoked_at?: DateTimeNullableFilter<"sessions"> | Date | string | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type sessionsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    hashed_token?: SortOrder
    user_agent?: SortOrder
    ip_hash?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    _count?: sessionsCountOrderByAggregateInput
    _max?: sessionsMaxOrderByAggregateInput
    _min?: sessionsMinOrderByAggregateInput
  }

  export type sessionsScalarWhereWithAggregatesInput = {
    AND?: sessionsScalarWhereWithAggregatesInput | sessionsScalarWhereWithAggregatesInput[]
    OR?: sessionsScalarWhereWithAggregatesInput[]
    NOT?: sessionsScalarWhereWithAggregatesInput | sessionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"sessions"> | string
    user_id?: StringWithAggregatesFilter<"sessions"> | string
    hashed_token?: StringWithAggregatesFilter<"sessions"> | string
    user_agent?: StringWithAggregatesFilter<"sessions"> | string
    ip_hash?: StringWithAggregatesFilter<"sessions"> | string
    created_at?: DateTimeWithAggregatesFilter<"sessions"> | Date | string
    expires_at?: DateTimeWithAggregatesFilter<"sessions"> | Date | string
    revoked_at?: DateTimeNullableWithAggregatesFilter<"sessions"> | Date | string | null
  }

  export type profilesWhereInput = {
    AND?: profilesWhereInput | profilesWhereInput[]
    OR?: profilesWhereInput[]
    NOT?: profilesWhereInput | profilesWhereInput[]
    user_id?: StringFilter<"profiles"> | string
    display_name?: StringNullableFilter<"profiles"> | string | null
    timezone?: StringNullableFilter<"profiles"> | string | null
    theme_color?: StringNullableFilter<"profiles"> | string | null
    updated_at?: DateTimeFilter<"profiles"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type profilesOrderByWithRelationInput = {
    user_id?: SortOrder
    display_name?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    theme_color?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type profilesWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    AND?: profilesWhereInput | profilesWhereInput[]
    OR?: profilesWhereInput[]
    NOT?: profilesWhereInput | profilesWhereInput[]
    display_name?: StringNullableFilter<"profiles"> | string | null
    timezone?: StringNullableFilter<"profiles"> | string | null
    theme_color?: StringNullableFilter<"profiles"> | string | null
    updated_at?: DateTimeFilter<"profiles"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "user_id">

  export type profilesOrderByWithAggregationInput = {
    user_id?: SortOrder
    display_name?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    theme_color?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    _count?: profilesCountOrderByAggregateInput
    _max?: profilesMaxOrderByAggregateInput
    _min?: profilesMinOrderByAggregateInput
  }

  export type profilesScalarWhereWithAggregatesInput = {
    AND?: profilesScalarWhereWithAggregatesInput | profilesScalarWhereWithAggregatesInput[]
    OR?: profilesScalarWhereWithAggregatesInput[]
    NOT?: profilesScalarWhereWithAggregatesInput | profilesScalarWhereWithAggregatesInput[]
    user_id?: StringWithAggregatesFilter<"profiles"> | string
    display_name?: StringNullableWithAggregatesFilter<"profiles"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"profiles"> | string | null
    theme_color?: StringNullableWithAggregatesFilter<"profiles"> | string | null
    updated_at?: DateTimeWithAggregatesFilter<"profiles"> | Date | string
  }

  export type traitsWhereInput = {
    AND?: traitsWhereInput | traitsWhereInput[]
    OR?: traitsWhereInput[]
    NOT?: traitsWhereInput | traitsWhereInput[]
    id?: StringFilter<"traits"> | string
    user_id?: StringFilter<"traits"> | string
    category?: StringFilter<"traits"> | string
    key?: StringFilter<"traits"> | string
    value_json?: JsonFilter<"traits">
    confidence?: FloatFilter<"traits"> | number
    completeness?: FloatFilter<"traits"> | number
    provenance?: StringFilter<"traits"> | string
    updated_at?: DateTimeFilter<"traits"> | Date | string
    source_id?: StringNullableFilter<"traits"> | string | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    sources?: XOR<SourcesNullableScalarRelationFilter, sourcesWhereInput> | null
  }

  export type traitsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    key?: SortOrder
    value_json?: SortOrder
    confidence?: SortOrder
    completeness?: SortOrder
    provenance?: SortOrder
    updated_at?: SortOrder
    source_id?: SortOrderInput | SortOrder
    user?: usersOrderByWithRelationInput
    sources?: sourcesOrderByWithRelationInput
  }

  export type traitsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: traitsWhereInput | traitsWhereInput[]
    OR?: traitsWhereInput[]
    NOT?: traitsWhereInput | traitsWhereInput[]
    user_id?: StringFilter<"traits"> | string
    category?: StringFilter<"traits"> | string
    key?: StringFilter<"traits"> | string
    value_json?: JsonFilter<"traits">
    confidence?: FloatFilter<"traits"> | number
    completeness?: FloatFilter<"traits"> | number
    provenance?: StringFilter<"traits"> | string
    updated_at?: DateTimeFilter<"traits"> | Date | string
    source_id?: StringNullableFilter<"traits"> | string | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    sources?: XOR<SourcesNullableScalarRelationFilter, sourcesWhereInput> | null
  }, "id">

  export type traitsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    key?: SortOrder
    value_json?: SortOrder
    confidence?: SortOrder
    completeness?: SortOrder
    provenance?: SortOrder
    updated_at?: SortOrder
    source_id?: SortOrderInput | SortOrder
    _count?: traitsCountOrderByAggregateInput
    _avg?: traitsAvgOrderByAggregateInput
    _max?: traitsMaxOrderByAggregateInput
    _min?: traitsMinOrderByAggregateInput
    _sum?: traitsSumOrderByAggregateInput
  }

  export type traitsScalarWhereWithAggregatesInput = {
    AND?: traitsScalarWhereWithAggregatesInput | traitsScalarWhereWithAggregatesInput[]
    OR?: traitsScalarWhereWithAggregatesInput[]
    NOT?: traitsScalarWhereWithAggregatesInput | traitsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"traits"> | string
    user_id?: StringWithAggregatesFilter<"traits"> | string
    category?: StringWithAggregatesFilter<"traits"> | string
    key?: StringWithAggregatesFilter<"traits"> | string
    value_json?: JsonWithAggregatesFilter<"traits">
    confidence?: FloatWithAggregatesFilter<"traits"> | number
    completeness?: FloatWithAggregatesFilter<"traits"> | number
    provenance?: StringWithAggregatesFilter<"traits"> | string
    updated_at?: DateTimeWithAggregatesFilter<"traits"> | Date | string
    source_id?: StringNullableWithAggregatesFilter<"traits"> | string | null
  }

  export type sourcesWhereInput = {
    AND?: sourcesWhereInput | sourcesWhereInput[]
    OR?: sourcesWhereInput[]
    NOT?: sourcesWhereInput | sourcesWhereInput[]
    id?: StringFilter<"sources"> | string
    user_id?: StringFilter<"sources"> | string
    type?: EnumSourceTypeFilter<"sources"> | $Enums.SourceType
    title?: StringFilter<"sources"> | string
    content_encrypted?: BytesFilter<"sources"> | Uint8Array
    iv?: StringFilter<"sources"> | string
    created_at?: DateTimeFilter<"sources"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    traits?: TraitsListRelationFilter
    embeddings?: EmbeddingsListRelationFilter
  }

  export type sourcesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    created_at?: SortOrder
    user?: usersOrderByWithRelationInput
    traits?: traitsOrderByRelationAggregateInput
    embeddings?: embeddingsOrderByRelationAggregateInput
  }

  export type sourcesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: sourcesWhereInput | sourcesWhereInput[]
    OR?: sourcesWhereInput[]
    NOT?: sourcesWhereInput | sourcesWhereInput[]
    user_id?: StringFilter<"sources"> | string
    type?: EnumSourceTypeFilter<"sources"> | $Enums.SourceType
    title?: StringFilter<"sources"> | string
    content_encrypted?: BytesFilter<"sources"> | Uint8Array
    iv?: StringFilter<"sources"> | string
    created_at?: DateTimeFilter<"sources"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    traits?: TraitsListRelationFilter
    embeddings?: EmbeddingsListRelationFilter
  }, "id">

  export type sourcesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    created_at?: SortOrder
    _count?: sourcesCountOrderByAggregateInput
    _max?: sourcesMaxOrderByAggregateInput
    _min?: sourcesMinOrderByAggregateInput
  }

  export type sourcesScalarWhereWithAggregatesInput = {
    AND?: sourcesScalarWhereWithAggregatesInput | sourcesScalarWhereWithAggregatesInput[]
    OR?: sourcesScalarWhereWithAggregatesInput[]
    NOT?: sourcesScalarWhereWithAggregatesInput | sourcesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"sources"> | string
    user_id?: StringWithAggregatesFilter<"sources"> | string
    type?: EnumSourceTypeWithAggregatesFilter<"sources"> | $Enums.SourceType
    title?: StringWithAggregatesFilter<"sources"> | string
    content_encrypted?: BytesWithAggregatesFilter<"sources"> | Uint8Array
    iv?: StringWithAggregatesFilter<"sources"> | string
    created_at?: DateTimeWithAggregatesFilter<"sources"> | Date | string
  }

  export type messagesWhereInput = {
    AND?: messagesWhereInput | messagesWhereInput[]
    OR?: messagesWhereInput[]
    NOT?: messagesWhereInput | messagesWhereInput[]
    id?: StringFilter<"messages"> | string
    user_id?: StringFilter<"messages"> | string
    role?: EnumRoleTypeFilter<"messages"> | $Enums.RoleType
    content_encrypted?: BytesFilter<"messages"> | Uint8Array
    iv?: StringFilter<"messages"> | string
    audio_url?: StringNullableFilter<"messages"> | string | null
    created_at?: DateTimeFilter<"messages"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type messagesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    audio_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type messagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: messagesWhereInput | messagesWhereInput[]
    OR?: messagesWhereInput[]
    NOT?: messagesWhereInput | messagesWhereInput[]
    user_id?: StringFilter<"messages"> | string
    role?: EnumRoleTypeFilter<"messages"> | $Enums.RoleType
    content_encrypted?: BytesFilter<"messages"> | Uint8Array
    iv?: StringFilter<"messages"> | string
    audio_url?: StringNullableFilter<"messages"> | string | null
    created_at?: DateTimeFilter<"messages"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type messagesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    audio_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: messagesCountOrderByAggregateInput
    _max?: messagesMaxOrderByAggregateInput
    _min?: messagesMinOrderByAggregateInput
  }

  export type messagesScalarWhereWithAggregatesInput = {
    AND?: messagesScalarWhereWithAggregatesInput | messagesScalarWhereWithAggregatesInput[]
    OR?: messagesScalarWhereWithAggregatesInput[]
    NOT?: messagesScalarWhereWithAggregatesInput | messagesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"messages"> | string
    user_id?: StringWithAggregatesFilter<"messages"> | string
    role?: EnumRoleTypeWithAggregatesFilter<"messages"> | $Enums.RoleType
    content_encrypted?: BytesWithAggregatesFilter<"messages"> | Uint8Array
    iv?: StringWithAggregatesFilter<"messages"> | string
    audio_url?: StringNullableWithAggregatesFilter<"messages"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"messages"> | Date | string
  }

  export type embeddingsWhereInput = {
    AND?: embeddingsWhereInput | embeddingsWhereInput[]
    OR?: embeddingsWhereInput[]
    NOT?: embeddingsWhereInput | embeddingsWhereInput[]
    id?: StringFilter<"embeddings"> | string
    user_id?: StringFilter<"embeddings"> | string
    vector_ref?: StringFilter<"embeddings"> | string
    source_id?: StringFilter<"embeddings"> | string
    category?: StringFilter<"embeddings"> | string
    chunk_meta?: JsonNullableFilter<"embeddings">
    created_at?: DateTimeFilter<"embeddings"> | Date | string
    source?: XOR<SourcesScalarRelationFilter, sourcesWhereInput>
  }

  export type embeddingsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    vector_ref?: SortOrder
    source_id?: SortOrder
    category?: SortOrder
    chunk_meta?: SortOrderInput | SortOrder
    created_at?: SortOrder
    source?: sourcesOrderByWithRelationInput
  }

  export type embeddingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: embeddingsWhereInput | embeddingsWhereInput[]
    OR?: embeddingsWhereInput[]
    NOT?: embeddingsWhereInput | embeddingsWhereInput[]
    user_id?: StringFilter<"embeddings"> | string
    vector_ref?: StringFilter<"embeddings"> | string
    source_id?: StringFilter<"embeddings"> | string
    category?: StringFilter<"embeddings"> | string
    chunk_meta?: JsonNullableFilter<"embeddings">
    created_at?: DateTimeFilter<"embeddings"> | Date | string
    source?: XOR<SourcesScalarRelationFilter, sourcesWhereInput>
  }, "id">

  export type embeddingsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    vector_ref?: SortOrder
    source_id?: SortOrder
    category?: SortOrder
    chunk_meta?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: embeddingsCountOrderByAggregateInput
    _max?: embeddingsMaxOrderByAggregateInput
    _min?: embeddingsMinOrderByAggregateInput
  }

  export type embeddingsScalarWhereWithAggregatesInput = {
    AND?: embeddingsScalarWhereWithAggregatesInput | embeddingsScalarWhereWithAggregatesInput[]
    OR?: embeddingsScalarWhereWithAggregatesInput[]
    NOT?: embeddingsScalarWhereWithAggregatesInput | embeddingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"embeddings"> | string
    user_id?: StringWithAggregatesFilter<"embeddings"> | string
    vector_ref?: StringWithAggregatesFilter<"embeddings"> | string
    source_id?: StringWithAggregatesFilter<"embeddings"> | string
    category?: StringWithAggregatesFilter<"embeddings"> | string
    chunk_meta?: JsonNullableWithAggregatesFilter<"embeddings">
    created_at?: DateTimeWithAggregatesFilter<"embeddings"> | Date | string
  }

  export type voice_profilesWhereInput = {
    AND?: voice_profilesWhereInput | voice_profilesWhereInput[]
    OR?: voice_profilesWhereInput[]
    NOT?: voice_profilesWhereInput | voice_profilesWhereInput[]
    id?: StringFilter<"voice_profiles"> | string
    user_id?: StringFilter<"voice_profiles"> | string
    provider?: StringFilter<"voice_profiles"> | string
    voice_id?: StringFilter<"voice_profiles"> | string
    consent_signed_at?: DateTimeNullableFilter<"voice_profiles"> | Date | string | null
    sample_meta?: JsonNullableFilter<"voice_profiles">
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type voice_profilesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    provider?: SortOrder
    voice_id?: SortOrder
    consent_signed_at?: SortOrderInput | SortOrder
    sample_meta?: SortOrderInput | SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type voice_profilesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: voice_profilesWhereInput | voice_profilesWhereInput[]
    OR?: voice_profilesWhereInput[]
    NOT?: voice_profilesWhereInput | voice_profilesWhereInput[]
    user_id?: StringFilter<"voice_profiles"> | string
    provider?: StringFilter<"voice_profiles"> | string
    voice_id?: StringFilter<"voice_profiles"> | string
    consent_signed_at?: DateTimeNullableFilter<"voice_profiles"> | Date | string | null
    sample_meta?: JsonNullableFilter<"voice_profiles">
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type voice_profilesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    provider?: SortOrder
    voice_id?: SortOrder
    consent_signed_at?: SortOrderInput | SortOrder
    sample_meta?: SortOrderInput | SortOrder
    _count?: voice_profilesCountOrderByAggregateInput
    _max?: voice_profilesMaxOrderByAggregateInput
    _min?: voice_profilesMinOrderByAggregateInput
  }

  export type voice_profilesScalarWhereWithAggregatesInput = {
    AND?: voice_profilesScalarWhereWithAggregatesInput | voice_profilesScalarWhereWithAggregatesInput[]
    OR?: voice_profilesScalarWhereWithAggregatesInput[]
    NOT?: voice_profilesScalarWhereWithAggregatesInput | voice_profilesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"voice_profiles"> | string
    user_id?: StringWithAggregatesFilter<"voice_profiles"> | string
    provider?: StringWithAggregatesFilter<"voice_profiles"> | string
    voice_id?: StringWithAggregatesFilter<"voice_profiles"> | string
    consent_signed_at?: DateTimeNullableWithAggregatesFilter<"voice_profiles"> | Date | string | null
    sample_meta?: JsonNullableWithAggregatesFilter<"voice_profiles">
  }

  export type embedding_jobsWhereInput = {
    AND?: embedding_jobsWhereInput | embedding_jobsWhereInput[]
    OR?: embedding_jobsWhereInput[]
    NOT?: embedding_jobsWhereInput | embedding_jobsWhereInput[]
    id?: StringFilter<"embedding_jobs"> | string
    job_id?: StringFilter<"embedding_jobs"> | string
    user_id?: StringNullableFilter<"embedding_jobs"> | string | null
    source_id?: StringNullableFilter<"embedding_jobs"> | string | null
    status?: StringFilter<"embedding_jobs"> | string
    result?: JsonNullableFilter<"embedding_jobs">
    created_at?: DateTimeFilter<"embedding_jobs"> | Date | string
    updated_at?: DateTimeFilter<"embedding_jobs"> | Date | string
  }

  export type embedding_jobsOrderByWithRelationInput = {
    id?: SortOrder
    job_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    source_id?: SortOrderInput | SortOrder
    status?: SortOrder
    result?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type embedding_jobsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    job_id?: string
    AND?: embedding_jobsWhereInput | embedding_jobsWhereInput[]
    OR?: embedding_jobsWhereInput[]
    NOT?: embedding_jobsWhereInput | embedding_jobsWhereInput[]
    user_id?: StringNullableFilter<"embedding_jobs"> | string | null
    source_id?: StringNullableFilter<"embedding_jobs"> | string | null
    status?: StringFilter<"embedding_jobs"> | string
    result?: JsonNullableFilter<"embedding_jobs">
    created_at?: DateTimeFilter<"embedding_jobs"> | Date | string
    updated_at?: DateTimeFilter<"embedding_jobs"> | Date | string
  }, "id" | "job_id">

  export type embedding_jobsOrderByWithAggregationInput = {
    id?: SortOrder
    job_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    source_id?: SortOrderInput | SortOrder
    status?: SortOrder
    result?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: embedding_jobsCountOrderByAggregateInput
    _max?: embedding_jobsMaxOrderByAggregateInput
    _min?: embedding_jobsMinOrderByAggregateInput
  }

  export type embedding_jobsScalarWhereWithAggregatesInput = {
    AND?: embedding_jobsScalarWhereWithAggregatesInput | embedding_jobsScalarWhereWithAggregatesInput[]
    OR?: embedding_jobsScalarWhereWithAggregatesInput[]
    NOT?: embedding_jobsScalarWhereWithAggregatesInput | embedding_jobsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"embedding_jobs"> | string
    job_id?: StringWithAggregatesFilter<"embedding_jobs"> | string
    user_id?: StringNullableWithAggregatesFilter<"embedding_jobs"> | string | null
    source_id?: StringNullableWithAggregatesFilter<"embedding_jobs"> | string | null
    status?: StringWithAggregatesFilter<"embedding_jobs"> | string
    result?: JsonNullableWithAggregatesFilter<"embedding_jobs">
    created_at?: DateTimeWithAggregatesFilter<"embedding_jobs"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"embedding_jobs"> | Date | string
  }

  export type usersCreateInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsCreateNestedManyWithoutUserInput
    sessions?: sessionsCreateNestedManyWithoutUserInput
    profiles?: profilesCreateNestedOneWithoutUserInput
    traits?: traitsCreateNestedManyWithoutUserInput
    sources?: sourcesCreateNestedManyWithoutUserInput
    messages?: messagesCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsUncheckedCreateNestedManyWithoutUserInput
    sessions?: sessionsUncheckedCreateNestedManyWithoutUserInput
    profiles?: profilesUncheckedCreateNestedOneWithoutUserInput
    traits?: traitsUncheckedCreateNestedManyWithoutUserInput
    sources?: sourcesUncheckedCreateNestedManyWithoutUserInput
    messages?: messagesUncheckedCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUpdateManyWithoutUserNestedInput
    sessions?: sessionsUpdateManyWithoutUserNestedInput
    profiles?: profilesUpdateOneWithoutUserNestedInput
    traits?: traitsUpdateManyWithoutUserNestedInput
    sources?: sourcesUpdateManyWithoutUserNestedInput
    messages?: messagesUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUncheckedUpdateManyWithoutUserNestedInput
    sessions?: sessionsUncheckedUpdateManyWithoutUserNestedInput
    profiles?: profilesUncheckedUpdateOneWithoutUserNestedInput
    traits?: traitsUncheckedUpdateManyWithoutUserNestedInput
    sources?: sourcesUncheckedUpdateManyWithoutUserNestedInput
    messages?: messagesUncheckedUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    email: string
    created_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credentialsCreateInput = {
    id?: string
    webauthn_credential_id: string
    public_key: string
    sign_count: number
    created_at?: Date | string
    user: usersCreateNestedOneWithoutCredentialsInput
  }

  export type credentialsUncheckedCreateInput = {
    id?: string
    user_id: string
    webauthn_credential_id: string
    public_key: string
    sign_count: number
    created_at?: Date | string
  }

  export type credentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    webauthn_credential_id?: StringFieldUpdateOperationsInput | string
    public_key?: StringFieldUpdateOperationsInput | string
    sign_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutCredentialsNestedInput
  }

  export type credentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    webauthn_credential_id?: StringFieldUpdateOperationsInput | string
    public_key?: StringFieldUpdateOperationsInput | string
    sign_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credentialsCreateManyInput = {
    id?: string
    user_id: string
    webauthn_credential_id: string
    public_key: string
    sign_count: number
    created_at?: Date | string
  }

  export type credentialsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    webauthn_credential_id?: StringFieldUpdateOperationsInput | string
    public_key?: StringFieldUpdateOperationsInput | string
    sign_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credentialsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    webauthn_credential_id?: StringFieldUpdateOperationsInput | string
    public_key?: StringFieldUpdateOperationsInput | string
    sign_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionsCreateInput = {
    id?: string
    hashed_token: string
    user_agent: string
    ip_hash: string
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
    user: usersCreateNestedOneWithoutSessionsInput
  }

  export type sessionsUncheckedCreateInput = {
    id?: string
    user_id: string
    hashed_token: string
    user_agent: string
    ip_hash: string
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type sessionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashed_token?: StringFieldUpdateOperationsInput | string
    user_agent?: StringFieldUpdateOperationsInput | string
    ip_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: usersUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type sessionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    hashed_token?: StringFieldUpdateOperationsInput | string
    user_agent?: StringFieldUpdateOperationsInput | string
    ip_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type sessionsCreateManyInput = {
    id?: string
    user_id: string
    hashed_token: string
    user_agent: string
    ip_hash: string
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type sessionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashed_token?: StringFieldUpdateOperationsInput | string
    user_agent?: StringFieldUpdateOperationsInput | string
    ip_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type sessionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    hashed_token?: StringFieldUpdateOperationsInput | string
    user_agent?: StringFieldUpdateOperationsInput | string
    ip_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type profilesCreateInput = {
    display_name?: string | null
    timezone?: string | null
    theme_color?: string | null
    updated_at?: Date | string
    user: usersCreateNestedOneWithoutProfilesInput
  }

  export type profilesUncheckedCreateInput = {
    user_id: string
    display_name?: string | null
    timezone?: string | null
    theme_color?: string | null
    updated_at?: Date | string
  }

  export type profilesUpdateInput = {
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    theme_color?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutProfilesNestedInput
  }

  export type profilesUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    theme_color?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type profilesCreateManyInput = {
    user_id: string
    display_name?: string | null
    timezone?: string | null
    theme_color?: string | null
    updated_at?: Date | string
  }

  export type profilesUpdateManyMutationInput = {
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    theme_color?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type profilesUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    theme_color?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type traitsCreateInput = {
    id?: string
    category: string
    key: string
    value_json: JsonNullValueInput | InputJsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at?: Date | string
    user: usersCreateNestedOneWithoutTraitsInput
    sources?: sourcesCreateNestedOneWithoutTraitsInput
  }

  export type traitsUncheckedCreateInput = {
    id?: string
    user_id: string
    category: string
    key: string
    value_json: JsonNullValueInput | InputJsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at?: Date | string
    source_id?: string | null
  }

  export type traitsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutTraitsNestedInput
    sources?: sourcesUpdateOneWithoutTraitsNestedInput
  }

  export type traitsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type traitsCreateManyInput = {
    id?: string
    user_id: string
    category: string
    key: string
    value_json: JsonNullValueInput | InputJsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at?: Date | string
    source_id?: string | null
  }

  export type traitsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type traitsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sourcesCreateInput = {
    id?: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
    user: usersCreateNestedOneWithoutSourcesInput
    traits?: traitsCreateNestedManyWithoutSourcesInput
    embeddings?: embeddingsCreateNestedManyWithoutSourceInput
  }

  export type sourcesUncheckedCreateInput = {
    id?: string
    user_id: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
    traits?: traitsUncheckedCreateNestedManyWithoutSourcesInput
    embeddings?: embeddingsUncheckedCreateNestedManyWithoutSourceInput
  }

  export type sourcesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutSourcesNestedInput
    traits?: traitsUpdateManyWithoutSourcesNestedInput
    embeddings?: embeddingsUpdateManyWithoutSourceNestedInput
  }

  export type sourcesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    traits?: traitsUncheckedUpdateManyWithoutSourcesNestedInput
    embeddings?: embeddingsUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type sourcesCreateManyInput = {
    id?: string
    user_id: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
  }

  export type sourcesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sourcesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messagesCreateInput = {
    id?: string
    role: $Enums.RoleType
    content_encrypted: Uint8Array
    iv?: string
    audio_url?: string | null
    created_at?: Date | string
    user: usersCreateNestedOneWithoutMessagesInput
  }

  export type messagesUncheckedCreateInput = {
    id?: string
    user_id: string
    role: $Enums.RoleType
    content_encrypted: Uint8Array
    iv?: string
    audio_url?: string | null
    created_at?: Date | string
  }

  export type messagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type messagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messagesCreateManyInput = {
    id?: string
    user_id: string
    role: $Enums.RoleType
    content_encrypted: Uint8Array
    iv?: string
    audio_url?: string | null
    created_at?: Date | string
  }

  export type messagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type embeddingsCreateInput = {
    id?: string
    user_id: string
    vector_ref: string
    category: string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    source: sourcesCreateNestedOneWithoutEmbeddingsInput
  }

  export type embeddingsUncheckedCreateInput = {
    id?: string
    user_id: string
    vector_ref: string
    source_id: string
    category: string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type embeddingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    vector_ref?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: sourcesUpdateOneRequiredWithoutEmbeddingsNestedInput
  }

  export type embeddingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    vector_ref?: StringFieldUpdateOperationsInput | string
    source_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type embeddingsCreateManyInput = {
    id?: string
    user_id: string
    vector_ref: string
    source_id: string
    category: string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type embeddingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    vector_ref?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type embeddingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    vector_ref?: StringFieldUpdateOperationsInput | string
    source_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type voice_profilesCreateInput = {
    id?: string
    provider: string
    voice_id: string
    consent_signed_at?: Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
    user: usersCreateNestedOneWithoutVoice_profilesInput
  }

  export type voice_profilesUncheckedCreateInput = {
    id?: string
    user_id: string
    provider: string
    voice_id: string
    consent_signed_at?: Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type voice_profilesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    consent_signed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
    user?: usersUpdateOneRequiredWithoutVoice_profilesNestedInput
  }

  export type voice_profilesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    consent_signed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type voice_profilesCreateManyInput = {
    id?: string
    user_id: string
    provider: string
    voice_id: string
    consent_signed_at?: Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type voice_profilesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    consent_signed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type voice_profilesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    consent_signed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type embedding_jobsCreateInput = {
    id?: string
    job_id: string
    user_id?: string | null
    source_id?: string | null
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type embedding_jobsUncheckedCreateInput = {
    id?: string
    job_id: string
    user_id?: string | null
    source_id?: string | null
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type embedding_jobsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type embedding_jobsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type embedding_jobsCreateManyInput = {
    id?: string
    job_id: string
    user_id?: string | null
    source_id?: string | null
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type embedding_jobsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type embedding_jobsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CredentialsListRelationFilter = {
    every?: credentialsWhereInput
    some?: credentialsWhereInput
    none?: credentialsWhereInput
  }

  export type SessionsListRelationFilter = {
    every?: sessionsWhereInput
    some?: sessionsWhereInput
    none?: sessionsWhereInput
  }

  export type ProfilesNullableScalarRelationFilter = {
    is?: profilesWhereInput | null
    isNot?: profilesWhereInput | null
  }

  export type TraitsListRelationFilter = {
    every?: traitsWhereInput
    some?: traitsWhereInput
    none?: traitsWhereInput
  }

  export type SourcesListRelationFilter = {
    every?: sourcesWhereInput
    some?: sourcesWhereInput
    none?: sourcesWhereInput
  }

  export type MessagesListRelationFilter = {
    every?: messagesWhereInput
    some?: messagesWhereInput
    none?: messagesWhereInput
  }

  export type Voice_profilesListRelationFilter = {
    every?: voice_profilesWhereInput
    some?: voice_profilesWhereInput
    none?: voice_profilesWhereInput
  }

  export type credentialsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sessionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type traitsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sourcesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type messagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type voice_profilesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type credentialsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    webauthn_credential_id?: SortOrder
    public_key?: SortOrder
    sign_count?: SortOrder
    created_at?: SortOrder
  }

  export type credentialsAvgOrderByAggregateInput = {
    sign_count?: SortOrder
  }

  export type credentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    webauthn_credential_id?: SortOrder
    public_key?: SortOrder
    sign_count?: SortOrder
    created_at?: SortOrder
  }

  export type credentialsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    webauthn_credential_id?: SortOrder
    public_key?: SortOrder
    sign_count?: SortOrder
    created_at?: SortOrder
  }

  export type credentialsSumOrderByAggregateInput = {
    sign_count?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type sessionsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    hashed_token?: SortOrder
    user_agent?: SortOrder
    ip_hash?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type sessionsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    hashed_token?: SortOrder
    user_agent?: SortOrder
    ip_hash?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type sessionsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    hashed_token?: SortOrder
    user_agent?: SortOrder
    ip_hash?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type profilesCountOrderByAggregateInput = {
    user_id?: SortOrder
    display_name?: SortOrder
    timezone?: SortOrder
    theme_color?: SortOrder
    updated_at?: SortOrder
  }

  export type profilesMaxOrderByAggregateInput = {
    user_id?: SortOrder
    display_name?: SortOrder
    timezone?: SortOrder
    theme_color?: SortOrder
    updated_at?: SortOrder
  }

  export type profilesMinOrderByAggregateInput = {
    user_id?: SortOrder
    display_name?: SortOrder
    timezone?: SortOrder
    theme_color?: SortOrder
    updated_at?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SourcesNullableScalarRelationFilter = {
    is?: sourcesWhereInput | null
    isNot?: sourcesWhereInput | null
  }

  export type traitsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    key?: SortOrder
    value_json?: SortOrder
    confidence?: SortOrder
    completeness?: SortOrder
    provenance?: SortOrder
    updated_at?: SortOrder
    source_id?: SortOrder
  }

  export type traitsAvgOrderByAggregateInput = {
    confidence?: SortOrder
    completeness?: SortOrder
  }

  export type traitsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    key?: SortOrder
    confidence?: SortOrder
    completeness?: SortOrder
    provenance?: SortOrder
    updated_at?: SortOrder
    source_id?: SortOrder
  }

  export type traitsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    key?: SortOrder
    confidence?: SortOrder
    completeness?: SortOrder
    provenance?: SortOrder
    updated_at?: SortOrder
    source_id?: SortOrder
  }

  export type traitsSumOrderByAggregateInput = {
    confidence?: SortOrder
    completeness?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type EmbeddingsListRelationFilter = {
    every?: embeddingsWhereInput
    some?: embeddingsWhereInput
    none?: embeddingsWhereInput
  }

  export type embeddingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sourcesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    created_at?: SortOrder
  }

  export type sourcesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    created_at?: SortOrder
  }

  export type sourcesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    created_at?: SortOrder
  }

  export type EnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type EnumRoleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleType | EnumRoleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleTypeFilter<$PrismaModel> | $Enums.RoleType
  }

  export type messagesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    audio_url?: SortOrder
    created_at?: SortOrder
  }

  export type messagesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    audio_url?: SortOrder
    created_at?: SortOrder
  }

  export type messagesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    content_encrypted?: SortOrder
    iv?: SortOrder
    audio_url?: SortOrder
    created_at?: SortOrder
  }

  export type EnumRoleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleType | EnumRoleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleTypeFilter<$PrismaModel>
    _max?: NestedEnumRoleTypeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SourcesScalarRelationFilter = {
    is?: sourcesWhereInput
    isNot?: sourcesWhereInput
  }

  export type embeddingsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    vector_ref?: SortOrder
    source_id?: SortOrder
    category?: SortOrder
    chunk_meta?: SortOrder
    created_at?: SortOrder
  }

  export type embeddingsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    vector_ref?: SortOrder
    source_id?: SortOrder
    category?: SortOrder
    created_at?: SortOrder
  }

  export type embeddingsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    vector_ref?: SortOrder
    source_id?: SortOrder
    category?: SortOrder
    created_at?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type voice_profilesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    provider?: SortOrder
    voice_id?: SortOrder
    consent_signed_at?: SortOrder
    sample_meta?: SortOrder
  }

  export type voice_profilesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    provider?: SortOrder
    voice_id?: SortOrder
    consent_signed_at?: SortOrder
  }

  export type voice_profilesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    provider?: SortOrder
    voice_id?: SortOrder
    consent_signed_at?: SortOrder
  }

  export type embedding_jobsCountOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    user_id?: SortOrder
    source_id?: SortOrder
    status?: SortOrder
    result?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type embedding_jobsMaxOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    user_id?: SortOrder
    source_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type embedding_jobsMinOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    user_id?: SortOrder
    source_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type credentialsCreateNestedManyWithoutUserInput = {
    create?: XOR<credentialsCreateWithoutUserInput, credentialsUncheckedCreateWithoutUserInput> | credentialsCreateWithoutUserInput[] | credentialsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credentialsCreateOrConnectWithoutUserInput | credentialsCreateOrConnectWithoutUserInput[]
    createMany?: credentialsCreateManyUserInputEnvelope
    connect?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
  }

  export type sessionsCreateNestedManyWithoutUserInput = {
    create?: XOR<sessionsCreateWithoutUserInput, sessionsUncheckedCreateWithoutUserInput> | sessionsCreateWithoutUserInput[] | sessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionsCreateOrConnectWithoutUserInput | sessionsCreateOrConnectWithoutUserInput[]
    createMany?: sessionsCreateManyUserInputEnvelope
    connect?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
  }

  export type profilesCreateNestedOneWithoutUserInput = {
    create?: XOR<profilesCreateWithoutUserInput, profilesUncheckedCreateWithoutUserInput>
    connectOrCreate?: profilesCreateOrConnectWithoutUserInput
    connect?: profilesWhereUniqueInput
  }

  export type traitsCreateNestedManyWithoutUserInput = {
    create?: XOR<traitsCreateWithoutUserInput, traitsUncheckedCreateWithoutUserInput> | traitsCreateWithoutUserInput[] | traitsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: traitsCreateOrConnectWithoutUserInput | traitsCreateOrConnectWithoutUserInput[]
    createMany?: traitsCreateManyUserInputEnvelope
    connect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
  }

  export type sourcesCreateNestedManyWithoutUserInput = {
    create?: XOR<sourcesCreateWithoutUserInput, sourcesUncheckedCreateWithoutUserInput> | sourcesCreateWithoutUserInput[] | sourcesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sourcesCreateOrConnectWithoutUserInput | sourcesCreateOrConnectWithoutUserInput[]
    createMany?: sourcesCreateManyUserInputEnvelope
    connect?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
  }

  export type messagesCreateNestedManyWithoutUserInput = {
    create?: XOR<messagesCreateWithoutUserInput, messagesUncheckedCreateWithoutUserInput> | messagesCreateWithoutUserInput[] | messagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUserInput | messagesCreateOrConnectWithoutUserInput[]
    createMany?: messagesCreateManyUserInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type voice_profilesCreateNestedManyWithoutUserInput = {
    create?: XOR<voice_profilesCreateWithoutUserInput, voice_profilesUncheckedCreateWithoutUserInput> | voice_profilesCreateWithoutUserInput[] | voice_profilesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: voice_profilesCreateOrConnectWithoutUserInput | voice_profilesCreateOrConnectWithoutUserInput[]
    createMany?: voice_profilesCreateManyUserInputEnvelope
    connect?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
  }

  export type credentialsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<credentialsCreateWithoutUserInput, credentialsUncheckedCreateWithoutUserInput> | credentialsCreateWithoutUserInput[] | credentialsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credentialsCreateOrConnectWithoutUserInput | credentialsCreateOrConnectWithoutUserInput[]
    createMany?: credentialsCreateManyUserInputEnvelope
    connect?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
  }

  export type sessionsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<sessionsCreateWithoutUserInput, sessionsUncheckedCreateWithoutUserInput> | sessionsCreateWithoutUserInput[] | sessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionsCreateOrConnectWithoutUserInput | sessionsCreateOrConnectWithoutUserInput[]
    createMany?: sessionsCreateManyUserInputEnvelope
    connect?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
  }

  export type profilesUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<profilesCreateWithoutUserInput, profilesUncheckedCreateWithoutUserInput>
    connectOrCreate?: profilesCreateOrConnectWithoutUserInput
    connect?: profilesWhereUniqueInput
  }

  export type traitsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<traitsCreateWithoutUserInput, traitsUncheckedCreateWithoutUserInput> | traitsCreateWithoutUserInput[] | traitsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: traitsCreateOrConnectWithoutUserInput | traitsCreateOrConnectWithoutUserInput[]
    createMany?: traitsCreateManyUserInputEnvelope
    connect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
  }

  export type sourcesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<sourcesCreateWithoutUserInput, sourcesUncheckedCreateWithoutUserInput> | sourcesCreateWithoutUserInput[] | sourcesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sourcesCreateOrConnectWithoutUserInput | sourcesCreateOrConnectWithoutUserInput[]
    createMany?: sourcesCreateManyUserInputEnvelope
    connect?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
  }

  export type messagesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<messagesCreateWithoutUserInput, messagesUncheckedCreateWithoutUserInput> | messagesCreateWithoutUserInput[] | messagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUserInput | messagesCreateOrConnectWithoutUserInput[]
    createMany?: messagesCreateManyUserInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type voice_profilesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<voice_profilesCreateWithoutUserInput, voice_profilesUncheckedCreateWithoutUserInput> | voice_profilesCreateWithoutUserInput[] | voice_profilesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: voice_profilesCreateOrConnectWithoutUserInput | voice_profilesCreateOrConnectWithoutUserInput[]
    createMany?: voice_profilesCreateManyUserInputEnvelope
    connect?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type credentialsUpdateManyWithoutUserNestedInput = {
    create?: XOR<credentialsCreateWithoutUserInput, credentialsUncheckedCreateWithoutUserInput> | credentialsCreateWithoutUserInput[] | credentialsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credentialsCreateOrConnectWithoutUserInput | credentialsCreateOrConnectWithoutUserInput[]
    upsert?: credentialsUpsertWithWhereUniqueWithoutUserInput | credentialsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: credentialsCreateManyUserInputEnvelope
    set?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
    disconnect?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
    delete?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
    connect?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
    update?: credentialsUpdateWithWhereUniqueWithoutUserInput | credentialsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: credentialsUpdateManyWithWhereWithoutUserInput | credentialsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: credentialsScalarWhereInput | credentialsScalarWhereInput[]
  }

  export type sessionsUpdateManyWithoutUserNestedInput = {
    create?: XOR<sessionsCreateWithoutUserInput, sessionsUncheckedCreateWithoutUserInput> | sessionsCreateWithoutUserInput[] | sessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionsCreateOrConnectWithoutUserInput | sessionsCreateOrConnectWithoutUserInput[]
    upsert?: sessionsUpsertWithWhereUniqueWithoutUserInput | sessionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sessionsCreateManyUserInputEnvelope
    set?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
    disconnect?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
    delete?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
    connect?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
    update?: sessionsUpdateWithWhereUniqueWithoutUserInput | sessionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sessionsUpdateManyWithWhereWithoutUserInput | sessionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sessionsScalarWhereInput | sessionsScalarWhereInput[]
  }

  export type profilesUpdateOneWithoutUserNestedInput = {
    create?: XOR<profilesCreateWithoutUserInput, profilesUncheckedCreateWithoutUserInput>
    connectOrCreate?: profilesCreateOrConnectWithoutUserInput
    upsert?: profilesUpsertWithoutUserInput
    disconnect?: profilesWhereInput | boolean
    delete?: profilesWhereInput | boolean
    connect?: profilesWhereUniqueInput
    update?: XOR<XOR<profilesUpdateToOneWithWhereWithoutUserInput, profilesUpdateWithoutUserInput>, profilesUncheckedUpdateWithoutUserInput>
  }

  export type traitsUpdateManyWithoutUserNestedInput = {
    create?: XOR<traitsCreateWithoutUserInput, traitsUncheckedCreateWithoutUserInput> | traitsCreateWithoutUserInput[] | traitsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: traitsCreateOrConnectWithoutUserInput | traitsCreateOrConnectWithoutUserInput[]
    upsert?: traitsUpsertWithWhereUniqueWithoutUserInput | traitsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: traitsCreateManyUserInputEnvelope
    set?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    disconnect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    delete?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    connect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    update?: traitsUpdateWithWhereUniqueWithoutUserInput | traitsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: traitsUpdateManyWithWhereWithoutUserInput | traitsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: traitsScalarWhereInput | traitsScalarWhereInput[]
  }

  export type sourcesUpdateManyWithoutUserNestedInput = {
    create?: XOR<sourcesCreateWithoutUserInput, sourcesUncheckedCreateWithoutUserInput> | sourcesCreateWithoutUserInput[] | sourcesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sourcesCreateOrConnectWithoutUserInput | sourcesCreateOrConnectWithoutUserInput[]
    upsert?: sourcesUpsertWithWhereUniqueWithoutUserInput | sourcesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sourcesCreateManyUserInputEnvelope
    set?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
    disconnect?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
    delete?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
    connect?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
    update?: sourcesUpdateWithWhereUniqueWithoutUserInput | sourcesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sourcesUpdateManyWithWhereWithoutUserInput | sourcesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sourcesScalarWhereInput | sourcesScalarWhereInput[]
  }

  export type messagesUpdateManyWithoutUserNestedInput = {
    create?: XOR<messagesCreateWithoutUserInput, messagesUncheckedCreateWithoutUserInput> | messagesCreateWithoutUserInput[] | messagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUserInput | messagesCreateOrConnectWithoutUserInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutUserInput | messagesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: messagesCreateManyUserInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutUserInput | messagesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutUserInput | messagesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type voice_profilesUpdateManyWithoutUserNestedInput = {
    create?: XOR<voice_profilesCreateWithoutUserInput, voice_profilesUncheckedCreateWithoutUserInput> | voice_profilesCreateWithoutUserInput[] | voice_profilesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: voice_profilesCreateOrConnectWithoutUserInput | voice_profilesCreateOrConnectWithoutUserInput[]
    upsert?: voice_profilesUpsertWithWhereUniqueWithoutUserInput | voice_profilesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: voice_profilesCreateManyUserInputEnvelope
    set?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
    disconnect?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
    delete?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
    connect?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
    update?: voice_profilesUpdateWithWhereUniqueWithoutUserInput | voice_profilesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: voice_profilesUpdateManyWithWhereWithoutUserInput | voice_profilesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: voice_profilesScalarWhereInput | voice_profilesScalarWhereInput[]
  }

  export type credentialsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<credentialsCreateWithoutUserInput, credentialsUncheckedCreateWithoutUserInput> | credentialsCreateWithoutUserInput[] | credentialsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credentialsCreateOrConnectWithoutUserInput | credentialsCreateOrConnectWithoutUserInput[]
    upsert?: credentialsUpsertWithWhereUniqueWithoutUserInput | credentialsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: credentialsCreateManyUserInputEnvelope
    set?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
    disconnect?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
    delete?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
    connect?: credentialsWhereUniqueInput | credentialsWhereUniqueInput[]
    update?: credentialsUpdateWithWhereUniqueWithoutUserInput | credentialsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: credentialsUpdateManyWithWhereWithoutUserInput | credentialsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: credentialsScalarWhereInput | credentialsScalarWhereInput[]
  }

  export type sessionsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<sessionsCreateWithoutUserInput, sessionsUncheckedCreateWithoutUserInput> | sessionsCreateWithoutUserInput[] | sessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionsCreateOrConnectWithoutUserInput | sessionsCreateOrConnectWithoutUserInput[]
    upsert?: sessionsUpsertWithWhereUniqueWithoutUserInput | sessionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sessionsCreateManyUserInputEnvelope
    set?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
    disconnect?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
    delete?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
    connect?: sessionsWhereUniqueInput | sessionsWhereUniqueInput[]
    update?: sessionsUpdateWithWhereUniqueWithoutUserInput | sessionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sessionsUpdateManyWithWhereWithoutUserInput | sessionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sessionsScalarWhereInput | sessionsScalarWhereInput[]
  }

  export type profilesUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<profilesCreateWithoutUserInput, profilesUncheckedCreateWithoutUserInput>
    connectOrCreate?: profilesCreateOrConnectWithoutUserInput
    upsert?: profilesUpsertWithoutUserInput
    disconnect?: profilesWhereInput | boolean
    delete?: profilesWhereInput | boolean
    connect?: profilesWhereUniqueInput
    update?: XOR<XOR<profilesUpdateToOneWithWhereWithoutUserInput, profilesUpdateWithoutUserInput>, profilesUncheckedUpdateWithoutUserInput>
  }

  export type traitsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<traitsCreateWithoutUserInput, traitsUncheckedCreateWithoutUserInput> | traitsCreateWithoutUserInput[] | traitsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: traitsCreateOrConnectWithoutUserInput | traitsCreateOrConnectWithoutUserInput[]
    upsert?: traitsUpsertWithWhereUniqueWithoutUserInput | traitsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: traitsCreateManyUserInputEnvelope
    set?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    disconnect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    delete?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    connect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    update?: traitsUpdateWithWhereUniqueWithoutUserInput | traitsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: traitsUpdateManyWithWhereWithoutUserInput | traitsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: traitsScalarWhereInput | traitsScalarWhereInput[]
  }

  export type sourcesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<sourcesCreateWithoutUserInput, sourcesUncheckedCreateWithoutUserInput> | sourcesCreateWithoutUserInput[] | sourcesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sourcesCreateOrConnectWithoutUserInput | sourcesCreateOrConnectWithoutUserInput[]
    upsert?: sourcesUpsertWithWhereUniqueWithoutUserInput | sourcesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sourcesCreateManyUserInputEnvelope
    set?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
    disconnect?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
    delete?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
    connect?: sourcesWhereUniqueInput | sourcesWhereUniqueInput[]
    update?: sourcesUpdateWithWhereUniqueWithoutUserInput | sourcesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sourcesUpdateManyWithWhereWithoutUserInput | sourcesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sourcesScalarWhereInput | sourcesScalarWhereInput[]
  }

  export type messagesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<messagesCreateWithoutUserInput, messagesUncheckedCreateWithoutUserInput> | messagesCreateWithoutUserInput[] | messagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUserInput | messagesCreateOrConnectWithoutUserInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutUserInput | messagesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: messagesCreateManyUserInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutUserInput | messagesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutUserInput | messagesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type voice_profilesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<voice_profilesCreateWithoutUserInput, voice_profilesUncheckedCreateWithoutUserInput> | voice_profilesCreateWithoutUserInput[] | voice_profilesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: voice_profilesCreateOrConnectWithoutUserInput | voice_profilesCreateOrConnectWithoutUserInput[]
    upsert?: voice_profilesUpsertWithWhereUniqueWithoutUserInput | voice_profilesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: voice_profilesCreateManyUserInputEnvelope
    set?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
    disconnect?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
    delete?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
    connect?: voice_profilesWhereUniqueInput | voice_profilesWhereUniqueInput[]
    update?: voice_profilesUpdateWithWhereUniqueWithoutUserInput | voice_profilesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: voice_profilesUpdateManyWithWhereWithoutUserInput | voice_profilesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: voice_profilesScalarWhereInput | voice_profilesScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutCredentialsInput = {
    create?: XOR<usersCreateWithoutCredentialsInput, usersUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCredentialsInput
    connect?: usersWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutCredentialsNestedInput = {
    create?: XOR<usersCreateWithoutCredentialsInput, usersUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCredentialsInput
    upsert?: usersUpsertWithoutCredentialsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCredentialsInput, usersUpdateWithoutCredentialsInput>, usersUncheckedUpdateWithoutCredentialsInput>
  }

  export type usersCreateNestedOneWithoutSessionsInput = {
    create?: XOR<usersCreateWithoutSessionsInput, usersUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutSessionsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type usersUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<usersCreateWithoutSessionsInput, usersUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutSessionsInput
    upsert?: usersUpsertWithoutSessionsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutSessionsInput, usersUpdateWithoutSessionsInput>, usersUncheckedUpdateWithoutSessionsInput>
  }

  export type usersCreateNestedOneWithoutProfilesInput = {
    create?: XOR<usersCreateWithoutProfilesInput, usersUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: usersCreateOrConnectWithoutProfilesInput
    connect?: usersWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type usersUpdateOneRequiredWithoutProfilesNestedInput = {
    create?: XOR<usersCreateWithoutProfilesInput, usersUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: usersCreateOrConnectWithoutProfilesInput
    upsert?: usersUpsertWithoutProfilesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutProfilesInput, usersUpdateWithoutProfilesInput>, usersUncheckedUpdateWithoutProfilesInput>
  }

  export type usersCreateNestedOneWithoutTraitsInput = {
    create?: XOR<usersCreateWithoutTraitsInput, usersUncheckedCreateWithoutTraitsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTraitsInput
    connect?: usersWhereUniqueInput
  }

  export type sourcesCreateNestedOneWithoutTraitsInput = {
    create?: XOR<sourcesCreateWithoutTraitsInput, sourcesUncheckedCreateWithoutTraitsInput>
    connectOrCreate?: sourcesCreateOrConnectWithoutTraitsInput
    connect?: sourcesWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutTraitsNestedInput = {
    create?: XOR<usersCreateWithoutTraitsInput, usersUncheckedCreateWithoutTraitsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTraitsInput
    upsert?: usersUpsertWithoutTraitsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTraitsInput, usersUpdateWithoutTraitsInput>, usersUncheckedUpdateWithoutTraitsInput>
  }

  export type sourcesUpdateOneWithoutTraitsNestedInput = {
    create?: XOR<sourcesCreateWithoutTraitsInput, sourcesUncheckedCreateWithoutTraitsInput>
    connectOrCreate?: sourcesCreateOrConnectWithoutTraitsInput
    upsert?: sourcesUpsertWithoutTraitsInput
    disconnect?: sourcesWhereInput | boolean
    delete?: sourcesWhereInput | boolean
    connect?: sourcesWhereUniqueInput
    update?: XOR<XOR<sourcesUpdateToOneWithWhereWithoutTraitsInput, sourcesUpdateWithoutTraitsInput>, sourcesUncheckedUpdateWithoutTraitsInput>
  }

  export type usersCreateNestedOneWithoutSourcesInput = {
    create?: XOR<usersCreateWithoutSourcesInput, usersUncheckedCreateWithoutSourcesInput>
    connectOrCreate?: usersCreateOrConnectWithoutSourcesInput
    connect?: usersWhereUniqueInput
  }

  export type traitsCreateNestedManyWithoutSourcesInput = {
    create?: XOR<traitsCreateWithoutSourcesInput, traitsUncheckedCreateWithoutSourcesInput> | traitsCreateWithoutSourcesInput[] | traitsUncheckedCreateWithoutSourcesInput[]
    connectOrCreate?: traitsCreateOrConnectWithoutSourcesInput | traitsCreateOrConnectWithoutSourcesInput[]
    createMany?: traitsCreateManySourcesInputEnvelope
    connect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
  }

  export type embeddingsCreateNestedManyWithoutSourceInput = {
    create?: XOR<embeddingsCreateWithoutSourceInput, embeddingsUncheckedCreateWithoutSourceInput> | embeddingsCreateWithoutSourceInput[] | embeddingsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: embeddingsCreateOrConnectWithoutSourceInput | embeddingsCreateOrConnectWithoutSourceInput[]
    createMany?: embeddingsCreateManySourceInputEnvelope
    connect?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
  }

  export type traitsUncheckedCreateNestedManyWithoutSourcesInput = {
    create?: XOR<traitsCreateWithoutSourcesInput, traitsUncheckedCreateWithoutSourcesInput> | traitsCreateWithoutSourcesInput[] | traitsUncheckedCreateWithoutSourcesInput[]
    connectOrCreate?: traitsCreateOrConnectWithoutSourcesInput | traitsCreateOrConnectWithoutSourcesInput[]
    createMany?: traitsCreateManySourcesInputEnvelope
    connect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
  }

  export type embeddingsUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<embeddingsCreateWithoutSourceInput, embeddingsUncheckedCreateWithoutSourceInput> | embeddingsCreateWithoutSourceInput[] | embeddingsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: embeddingsCreateOrConnectWithoutSourceInput | embeddingsCreateOrConnectWithoutSourceInput[]
    createMany?: embeddingsCreateManySourceInputEnvelope
    connect?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
  }

  export type EnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Uint8Array
  }

  export type usersUpdateOneRequiredWithoutSourcesNestedInput = {
    create?: XOR<usersCreateWithoutSourcesInput, usersUncheckedCreateWithoutSourcesInput>
    connectOrCreate?: usersCreateOrConnectWithoutSourcesInput
    upsert?: usersUpsertWithoutSourcesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutSourcesInput, usersUpdateWithoutSourcesInput>, usersUncheckedUpdateWithoutSourcesInput>
  }

  export type traitsUpdateManyWithoutSourcesNestedInput = {
    create?: XOR<traitsCreateWithoutSourcesInput, traitsUncheckedCreateWithoutSourcesInput> | traitsCreateWithoutSourcesInput[] | traitsUncheckedCreateWithoutSourcesInput[]
    connectOrCreate?: traitsCreateOrConnectWithoutSourcesInput | traitsCreateOrConnectWithoutSourcesInput[]
    upsert?: traitsUpsertWithWhereUniqueWithoutSourcesInput | traitsUpsertWithWhereUniqueWithoutSourcesInput[]
    createMany?: traitsCreateManySourcesInputEnvelope
    set?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    disconnect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    delete?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    connect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    update?: traitsUpdateWithWhereUniqueWithoutSourcesInput | traitsUpdateWithWhereUniqueWithoutSourcesInput[]
    updateMany?: traitsUpdateManyWithWhereWithoutSourcesInput | traitsUpdateManyWithWhereWithoutSourcesInput[]
    deleteMany?: traitsScalarWhereInput | traitsScalarWhereInput[]
  }

  export type embeddingsUpdateManyWithoutSourceNestedInput = {
    create?: XOR<embeddingsCreateWithoutSourceInput, embeddingsUncheckedCreateWithoutSourceInput> | embeddingsCreateWithoutSourceInput[] | embeddingsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: embeddingsCreateOrConnectWithoutSourceInput | embeddingsCreateOrConnectWithoutSourceInput[]
    upsert?: embeddingsUpsertWithWhereUniqueWithoutSourceInput | embeddingsUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: embeddingsCreateManySourceInputEnvelope
    set?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
    disconnect?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
    delete?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
    connect?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
    update?: embeddingsUpdateWithWhereUniqueWithoutSourceInput | embeddingsUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: embeddingsUpdateManyWithWhereWithoutSourceInput | embeddingsUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: embeddingsScalarWhereInput | embeddingsScalarWhereInput[]
  }

  export type traitsUncheckedUpdateManyWithoutSourcesNestedInput = {
    create?: XOR<traitsCreateWithoutSourcesInput, traitsUncheckedCreateWithoutSourcesInput> | traitsCreateWithoutSourcesInput[] | traitsUncheckedCreateWithoutSourcesInput[]
    connectOrCreate?: traitsCreateOrConnectWithoutSourcesInput | traitsCreateOrConnectWithoutSourcesInput[]
    upsert?: traitsUpsertWithWhereUniqueWithoutSourcesInput | traitsUpsertWithWhereUniqueWithoutSourcesInput[]
    createMany?: traitsCreateManySourcesInputEnvelope
    set?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    disconnect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    delete?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    connect?: traitsWhereUniqueInput | traitsWhereUniqueInput[]
    update?: traitsUpdateWithWhereUniqueWithoutSourcesInput | traitsUpdateWithWhereUniqueWithoutSourcesInput[]
    updateMany?: traitsUpdateManyWithWhereWithoutSourcesInput | traitsUpdateManyWithWhereWithoutSourcesInput[]
    deleteMany?: traitsScalarWhereInput | traitsScalarWhereInput[]
  }

  export type embeddingsUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<embeddingsCreateWithoutSourceInput, embeddingsUncheckedCreateWithoutSourceInput> | embeddingsCreateWithoutSourceInput[] | embeddingsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: embeddingsCreateOrConnectWithoutSourceInput | embeddingsCreateOrConnectWithoutSourceInput[]
    upsert?: embeddingsUpsertWithWhereUniqueWithoutSourceInput | embeddingsUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: embeddingsCreateManySourceInputEnvelope
    set?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
    disconnect?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
    delete?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
    connect?: embeddingsWhereUniqueInput | embeddingsWhereUniqueInput[]
    update?: embeddingsUpdateWithWhereUniqueWithoutSourceInput | embeddingsUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: embeddingsUpdateManyWithWhereWithoutSourceInput | embeddingsUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: embeddingsScalarWhereInput | embeddingsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutMessagesInput = {
    create?: XOR<usersCreateWithoutMessagesInput, usersUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: usersCreateOrConnectWithoutMessagesInput
    connect?: usersWhereUniqueInput
  }

  export type EnumRoleTypeFieldUpdateOperationsInput = {
    set?: $Enums.RoleType
  }

  export type usersUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<usersCreateWithoutMessagesInput, usersUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: usersCreateOrConnectWithoutMessagesInput
    upsert?: usersUpsertWithoutMessagesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutMessagesInput, usersUpdateWithoutMessagesInput>, usersUncheckedUpdateWithoutMessagesInput>
  }

  export type sourcesCreateNestedOneWithoutEmbeddingsInput = {
    create?: XOR<sourcesCreateWithoutEmbeddingsInput, sourcesUncheckedCreateWithoutEmbeddingsInput>
    connectOrCreate?: sourcesCreateOrConnectWithoutEmbeddingsInput
    connect?: sourcesWhereUniqueInput
  }

  export type sourcesUpdateOneRequiredWithoutEmbeddingsNestedInput = {
    create?: XOR<sourcesCreateWithoutEmbeddingsInput, sourcesUncheckedCreateWithoutEmbeddingsInput>
    connectOrCreate?: sourcesCreateOrConnectWithoutEmbeddingsInput
    upsert?: sourcesUpsertWithoutEmbeddingsInput
    connect?: sourcesWhereUniqueInput
    update?: XOR<XOR<sourcesUpdateToOneWithWhereWithoutEmbeddingsInput, sourcesUpdateWithoutEmbeddingsInput>, sourcesUncheckedUpdateWithoutEmbeddingsInput>
  }

  export type usersCreateNestedOneWithoutVoice_profilesInput = {
    create?: XOR<usersCreateWithoutVoice_profilesInput, usersUncheckedCreateWithoutVoice_profilesInput>
    connectOrCreate?: usersCreateOrConnectWithoutVoice_profilesInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutVoice_profilesNestedInput = {
    create?: XOR<usersCreateWithoutVoice_profilesInput, usersUncheckedCreateWithoutVoice_profilesInput>
    connectOrCreate?: usersCreateOrConnectWithoutVoice_profilesInput
    upsert?: usersUpsertWithoutVoice_profilesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutVoice_profilesInput, usersUpdateWithoutVoice_profilesInput>, usersUncheckedUpdateWithoutVoice_profilesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type NestedEnumRoleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleType | EnumRoleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleTypeFilter<$PrismaModel> | $Enums.RoleType
  }

  export type NestedEnumRoleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleType | EnumRoleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleTypeFilter<$PrismaModel>
    _max?: NestedEnumRoleTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type credentialsCreateWithoutUserInput = {
    id?: string
    webauthn_credential_id: string
    public_key: string
    sign_count: number
    created_at?: Date | string
  }

  export type credentialsUncheckedCreateWithoutUserInput = {
    id?: string
    webauthn_credential_id: string
    public_key: string
    sign_count: number
    created_at?: Date | string
  }

  export type credentialsCreateOrConnectWithoutUserInput = {
    where: credentialsWhereUniqueInput
    create: XOR<credentialsCreateWithoutUserInput, credentialsUncheckedCreateWithoutUserInput>
  }

  export type credentialsCreateManyUserInputEnvelope = {
    data: credentialsCreateManyUserInput | credentialsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type sessionsCreateWithoutUserInput = {
    id?: string
    hashed_token: string
    user_agent: string
    ip_hash: string
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type sessionsUncheckedCreateWithoutUserInput = {
    id?: string
    hashed_token: string
    user_agent: string
    ip_hash: string
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type sessionsCreateOrConnectWithoutUserInput = {
    where: sessionsWhereUniqueInput
    create: XOR<sessionsCreateWithoutUserInput, sessionsUncheckedCreateWithoutUserInput>
  }

  export type sessionsCreateManyUserInputEnvelope = {
    data: sessionsCreateManyUserInput | sessionsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type profilesCreateWithoutUserInput = {
    display_name?: string | null
    timezone?: string | null
    theme_color?: string | null
    updated_at?: Date | string
  }

  export type profilesUncheckedCreateWithoutUserInput = {
    display_name?: string | null
    timezone?: string | null
    theme_color?: string | null
    updated_at?: Date | string
  }

  export type profilesCreateOrConnectWithoutUserInput = {
    where: profilesWhereUniqueInput
    create: XOR<profilesCreateWithoutUserInput, profilesUncheckedCreateWithoutUserInput>
  }

  export type traitsCreateWithoutUserInput = {
    id?: string
    category: string
    key: string
    value_json: JsonNullValueInput | InputJsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at?: Date | string
    sources?: sourcesCreateNestedOneWithoutTraitsInput
  }

  export type traitsUncheckedCreateWithoutUserInput = {
    id?: string
    category: string
    key: string
    value_json: JsonNullValueInput | InputJsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at?: Date | string
    source_id?: string | null
  }

  export type traitsCreateOrConnectWithoutUserInput = {
    where: traitsWhereUniqueInput
    create: XOR<traitsCreateWithoutUserInput, traitsUncheckedCreateWithoutUserInput>
  }

  export type traitsCreateManyUserInputEnvelope = {
    data: traitsCreateManyUserInput | traitsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type sourcesCreateWithoutUserInput = {
    id?: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
    traits?: traitsCreateNestedManyWithoutSourcesInput
    embeddings?: embeddingsCreateNestedManyWithoutSourceInput
  }

  export type sourcesUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
    traits?: traitsUncheckedCreateNestedManyWithoutSourcesInput
    embeddings?: embeddingsUncheckedCreateNestedManyWithoutSourceInput
  }

  export type sourcesCreateOrConnectWithoutUserInput = {
    where: sourcesWhereUniqueInput
    create: XOR<sourcesCreateWithoutUserInput, sourcesUncheckedCreateWithoutUserInput>
  }

  export type sourcesCreateManyUserInputEnvelope = {
    data: sourcesCreateManyUserInput | sourcesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type messagesCreateWithoutUserInput = {
    id?: string
    role: $Enums.RoleType
    content_encrypted: Uint8Array
    iv?: string
    audio_url?: string | null
    created_at?: Date | string
  }

  export type messagesUncheckedCreateWithoutUserInput = {
    id?: string
    role: $Enums.RoleType
    content_encrypted: Uint8Array
    iv?: string
    audio_url?: string | null
    created_at?: Date | string
  }

  export type messagesCreateOrConnectWithoutUserInput = {
    where: messagesWhereUniqueInput
    create: XOR<messagesCreateWithoutUserInput, messagesUncheckedCreateWithoutUserInput>
  }

  export type messagesCreateManyUserInputEnvelope = {
    data: messagesCreateManyUserInput | messagesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type voice_profilesCreateWithoutUserInput = {
    id?: string
    provider: string
    voice_id: string
    consent_signed_at?: Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type voice_profilesUncheckedCreateWithoutUserInput = {
    id?: string
    provider: string
    voice_id: string
    consent_signed_at?: Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type voice_profilesCreateOrConnectWithoutUserInput = {
    where: voice_profilesWhereUniqueInput
    create: XOR<voice_profilesCreateWithoutUserInput, voice_profilesUncheckedCreateWithoutUserInput>
  }

  export type voice_profilesCreateManyUserInputEnvelope = {
    data: voice_profilesCreateManyUserInput | voice_profilesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type credentialsUpsertWithWhereUniqueWithoutUserInput = {
    where: credentialsWhereUniqueInput
    update: XOR<credentialsUpdateWithoutUserInput, credentialsUncheckedUpdateWithoutUserInput>
    create: XOR<credentialsCreateWithoutUserInput, credentialsUncheckedCreateWithoutUserInput>
  }

  export type credentialsUpdateWithWhereUniqueWithoutUserInput = {
    where: credentialsWhereUniqueInput
    data: XOR<credentialsUpdateWithoutUserInput, credentialsUncheckedUpdateWithoutUserInput>
  }

  export type credentialsUpdateManyWithWhereWithoutUserInput = {
    where: credentialsScalarWhereInput
    data: XOR<credentialsUpdateManyMutationInput, credentialsUncheckedUpdateManyWithoutUserInput>
  }

  export type credentialsScalarWhereInput = {
    AND?: credentialsScalarWhereInput | credentialsScalarWhereInput[]
    OR?: credentialsScalarWhereInput[]
    NOT?: credentialsScalarWhereInput | credentialsScalarWhereInput[]
    id?: StringFilter<"credentials"> | string
    user_id?: StringFilter<"credentials"> | string
    webauthn_credential_id?: StringFilter<"credentials"> | string
    public_key?: StringFilter<"credentials"> | string
    sign_count?: IntFilter<"credentials"> | number
    created_at?: DateTimeFilter<"credentials"> | Date | string
  }

  export type sessionsUpsertWithWhereUniqueWithoutUserInput = {
    where: sessionsWhereUniqueInput
    update: XOR<sessionsUpdateWithoutUserInput, sessionsUncheckedUpdateWithoutUserInput>
    create: XOR<sessionsCreateWithoutUserInput, sessionsUncheckedCreateWithoutUserInput>
  }

  export type sessionsUpdateWithWhereUniqueWithoutUserInput = {
    where: sessionsWhereUniqueInput
    data: XOR<sessionsUpdateWithoutUserInput, sessionsUncheckedUpdateWithoutUserInput>
  }

  export type sessionsUpdateManyWithWhereWithoutUserInput = {
    where: sessionsScalarWhereInput
    data: XOR<sessionsUpdateManyMutationInput, sessionsUncheckedUpdateManyWithoutUserInput>
  }

  export type sessionsScalarWhereInput = {
    AND?: sessionsScalarWhereInput | sessionsScalarWhereInput[]
    OR?: sessionsScalarWhereInput[]
    NOT?: sessionsScalarWhereInput | sessionsScalarWhereInput[]
    id?: StringFilter<"sessions"> | string
    user_id?: StringFilter<"sessions"> | string
    hashed_token?: StringFilter<"sessions"> | string
    user_agent?: StringFilter<"sessions"> | string
    ip_hash?: StringFilter<"sessions"> | string
    created_at?: DateTimeFilter<"sessions"> | Date | string
    expires_at?: DateTimeFilter<"sessions"> | Date | string
    revoked_at?: DateTimeNullableFilter<"sessions"> | Date | string | null
  }

  export type profilesUpsertWithoutUserInput = {
    update: XOR<profilesUpdateWithoutUserInput, profilesUncheckedUpdateWithoutUserInput>
    create: XOR<profilesCreateWithoutUserInput, profilesUncheckedCreateWithoutUserInput>
    where?: profilesWhereInput
  }

  export type profilesUpdateToOneWithWhereWithoutUserInput = {
    where?: profilesWhereInput
    data: XOR<profilesUpdateWithoutUserInput, profilesUncheckedUpdateWithoutUserInput>
  }

  export type profilesUpdateWithoutUserInput = {
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    theme_color?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type profilesUncheckedUpdateWithoutUserInput = {
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    theme_color?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type traitsUpsertWithWhereUniqueWithoutUserInput = {
    where: traitsWhereUniqueInput
    update: XOR<traitsUpdateWithoutUserInput, traitsUncheckedUpdateWithoutUserInput>
    create: XOR<traitsCreateWithoutUserInput, traitsUncheckedCreateWithoutUserInput>
  }

  export type traitsUpdateWithWhereUniqueWithoutUserInput = {
    where: traitsWhereUniqueInput
    data: XOR<traitsUpdateWithoutUserInput, traitsUncheckedUpdateWithoutUserInput>
  }

  export type traitsUpdateManyWithWhereWithoutUserInput = {
    where: traitsScalarWhereInput
    data: XOR<traitsUpdateManyMutationInput, traitsUncheckedUpdateManyWithoutUserInput>
  }

  export type traitsScalarWhereInput = {
    AND?: traitsScalarWhereInput | traitsScalarWhereInput[]
    OR?: traitsScalarWhereInput[]
    NOT?: traitsScalarWhereInput | traitsScalarWhereInput[]
    id?: StringFilter<"traits"> | string
    user_id?: StringFilter<"traits"> | string
    category?: StringFilter<"traits"> | string
    key?: StringFilter<"traits"> | string
    value_json?: JsonFilter<"traits">
    confidence?: FloatFilter<"traits"> | number
    completeness?: FloatFilter<"traits"> | number
    provenance?: StringFilter<"traits"> | string
    updated_at?: DateTimeFilter<"traits"> | Date | string
    source_id?: StringNullableFilter<"traits"> | string | null
  }

  export type sourcesUpsertWithWhereUniqueWithoutUserInput = {
    where: sourcesWhereUniqueInput
    update: XOR<sourcesUpdateWithoutUserInput, sourcesUncheckedUpdateWithoutUserInput>
    create: XOR<sourcesCreateWithoutUserInput, sourcesUncheckedCreateWithoutUserInput>
  }

  export type sourcesUpdateWithWhereUniqueWithoutUserInput = {
    where: sourcesWhereUniqueInput
    data: XOR<sourcesUpdateWithoutUserInput, sourcesUncheckedUpdateWithoutUserInput>
  }

  export type sourcesUpdateManyWithWhereWithoutUserInput = {
    where: sourcesScalarWhereInput
    data: XOR<sourcesUpdateManyMutationInput, sourcesUncheckedUpdateManyWithoutUserInput>
  }

  export type sourcesScalarWhereInput = {
    AND?: sourcesScalarWhereInput | sourcesScalarWhereInput[]
    OR?: sourcesScalarWhereInput[]
    NOT?: sourcesScalarWhereInput | sourcesScalarWhereInput[]
    id?: StringFilter<"sources"> | string
    user_id?: StringFilter<"sources"> | string
    type?: EnumSourceTypeFilter<"sources"> | $Enums.SourceType
    title?: StringFilter<"sources"> | string
    content_encrypted?: BytesFilter<"sources"> | Uint8Array
    iv?: StringFilter<"sources"> | string
    created_at?: DateTimeFilter<"sources"> | Date | string
  }

  export type messagesUpsertWithWhereUniqueWithoutUserInput = {
    where: messagesWhereUniqueInput
    update: XOR<messagesUpdateWithoutUserInput, messagesUncheckedUpdateWithoutUserInput>
    create: XOR<messagesCreateWithoutUserInput, messagesUncheckedCreateWithoutUserInput>
  }

  export type messagesUpdateWithWhereUniqueWithoutUserInput = {
    where: messagesWhereUniqueInput
    data: XOR<messagesUpdateWithoutUserInput, messagesUncheckedUpdateWithoutUserInput>
  }

  export type messagesUpdateManyWithWhereWithoutUserInput = {
    where: messagesScalarWhereInput
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyWithoutUserInput>
  }

  export type messagesScalarWhereInput = {
    AND?: messagesScalarWhereInput | messagesScalarWhereInput[]
    OR?: messagesScalarWhereInput[]
    NOT?: messagesScalarWhereInput | messagesScalarWhereInput[]
    id?: StringFilter<"messages"> | string
    user_id?: StringFilter<"messages"> | string
    role?: EnumRoleTypeFilter<"messages"> | $Enums.RoleType
    content_encrypted?: BytesFilter<"messages"> | Uint8Array
    iv?: StringFilter<"messages"> | string
    audio_url?: StringNullableFilter<"messages"> | string | null
    created_at?: DateTimeFilter<"messages"> | Date | string
  }

  export type voice_profilesUpsertWithWhereUniqueWithoutUserInput = {
    where: voice_profilesWhereUniqueInput
    update: XOR<voice_profilesUpdateWithoutUserInput, voice_profilesUncheckedUpdateWithoutUserInput>
    create: XOR<voice_profilesCreateWithoutUserInput, voice_profilesUncheckedCreateWithoutUserInput>
  }

  export type voice_profilesUpdateWithWhereUniqueWithoutUserInput = {
    where: voice_profilesWhereUniqueInput
    data: XOR<voice_profilesUpdateWithoutUserInput, voice_profilesUncheckedUpdateWithoutUserInput>
  }

  export type voice_profilesUpdateManyWithWhereWithoutUserInput = {
    where: voice_profilesScalarWhereInput
    data: XOR<voice_profilesUpdateManyMutationInput, voice_profilesUncheckedUpdateManyWithoutUserInput>
  }

  export type voice_profilesScalarWhereInput = {
    AND?: voice_profilesScalarWhereInput | voice_profilesScalarWhereInput[]
    OR?: voice_profilesScalarWhereInput[]
    NOT?: voice_profilesScalarWhereInput | voice_profilesScalarWhereInput[]
    id?: StringFilter<"voice_profiles"> | string
    user_id?: StringFilter<"voice_profiles"> | string
    provider?: StringFilter<"voice_profiles"> | string
    voice_id?: StringFilter<"voice_profiles"> | string
    consent_signed_at?: DateTimeNullableFilter<"voice_profiles"> | Date | string | null
    sample_meta?: JsonNullableFilter<"voice_profiles">
  }

  export type usersCreateWithoutCredentialsInput = {
    id?: string
    email: string
    created_at?: Date | string
    sessions?: sessionsCreateNestedManyWithoutUserInput
    profiles?: profilesCreateNestedOneWithoutUserInput
    traits?: traitsCreateNestedManyWithoutUserInput
    sources?: sourcesCreateNestedManyWithoutUserInput
    messages?: messagesCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutCredentialsInput = {
    id?: string
    email: string
    created_at?: Date | string
    sessions?: sessionsUncheckedCreateNestedManyWithoutUserInput
    profiles?: profilesUncheckedCreateNestedOneWithoutUserInput
    traits?: traitsUncheckedCreateNestedManyWithoutUserInput
    sources?: sourcesUncheckedCreateNestedManyWithoutUserInput
    messages?: messagesUncheckedCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutCredentialsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCredentialsInput, usersUncheckedCreateWithoutCredentialsInput>
  }

  export type usersUpsertWithoutCredentialsInput = {
    update: XOR<usersUpdateWithoutCredentialsInput, usersUncheckedUpdateWithoutCredentialsInput>
    create: XOR<usersCreateWithoutCredentialsInput, usersUncheckedCreateWithoutCredentialsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCredentialsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCredentialsInput, usersUncheckedUpdateWithoutCredentialsInput>
  }

  export type usersUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: sessionsUpdateManyWithoutUserNestedInput
    profiles?: profilesUpdateOneWithoutUserNestedInput
    traits?: traitsUpdateManyWithoutUserNestedInput
    sources?: sourcesUpdateManyWithoutUserNestedInput
    messages?: messagesUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: sessionsUncheckedUpdateManyWithoutUserNestedInput
    profiles?: profilesUncheckedUpdateOneWithoutUserNestedInput
    traits?: traitsUncheckedUpdateManyWithoutUserNestedInput
    sources?: sourcesUncheckedUpdateManyWithoutUserNestedInput
    messages?: messagesUncheckedUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateWithoutSessionsInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsCreateNestedManyWithoutUserInput
    profiles?: profilesCreateNestedOneWithoutUserInput
    traits?: traitsCreateNestedManyWithoutUserInput
    sources?: sourcesCreateNestedManyWithoutUserInput
    messages?: messagesCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsUncheckedCreateNestedManyWithoutUserInput
    profiles?: profilesUncheckedCreateNestedOneWithoutUserInput
    traits?: traitsUncheckedCreateNestedManyWithoutUserInput
    sources?: sourcesUncheckedCreateNestedManyWithoutUserInput
    messages?: messagesUncheckedCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutSessionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutSessionsInput, usersUncheckedCreateWithoutSessionsInput>
  }

  export type usersUpsertWithoutSessionsInput = {
    update: XOR<usersUpdateWithoutSessionsInput, usersUncheckedUpdateWithoutSessionsInput>
    create: XOR<usersCreateWithoutSessionsInput, usersUncheckedCreateWithoutSessionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutSessionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutSessionsInput, usersUncheckedUpdateWithoutSessionsInput>
  }

  export type usersUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUpdateManyWithoutUserNestedInput
    profiles?: profilesUpdateOneWithoutUserNestedInput
    traits?: traitsUpdateManyWithoutUserNestedInput
    sources?: sourcesUpdateManyWithoutUserNestedInput
    messages?: messagesUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUncheckedUpdateManyWithoutUserNestedInput
    profiles?: profilesUncheckedUpdateOneWithoutUserNestedInput
    traits?: traitsUncheckedUpdateManyWithoutUserNestedInput
    sources?: sourcesUncheckedUpdateManyWithoutUserNestedInput
    messages?: messagesUncheckedUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateWithoutProfilesInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsCreateNestedManyWithoutUserInput
    sessions?: sessionsCreateNestedManyWithoutUserInput
    traits?: traitsCreateNestedManyWithoutUserInput
    sources?: sourcesCreateNestedManyWithoutUserInput
    messages?: messagesCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutProfilesInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsUncheckedCreateNestedManyWithoutUserInput
    sessions?: sessionsUncheckedCreateNestedManyWithoutUserInput
    traits?: traitsUncheckedCreateNestedManyWithoutUserInput
    sources?: sourcesUncheckedCreateNestedManyWithoutUserInput
    messages?: messagesUncheckedCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutProfilesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutProfilesInput, usersUncheckedCreateWithoutProfilesInput>
  }

  export type usersUpsertWithoutProfilesInput = {
    update: XOR<usersUpdateWithoutProfilesInput, usersUncheckedUpdateWithoutProfilesInput>
    create: XOR<usersCreateWithoutProfilesInput, usersUncheckedCreateWithoutProfilesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutProfilesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutProfilesInput, usersUncheckedUpdateWithoutProfilesInput>
  }

  export type usersUpdateWithoutProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUpdateManyWithoutUserNestedInput
    sessions?: sessionsUpdateManyWithoutUserNestedInput
    traits?: traitsUpdateManyWithoutUserNestedInput
    sources?: sourcesUpdateManyWithoutUserNestedInput
    messages?: messagesUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutProfilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUncheckedUpdateManyWithoutUserNestedInput
    sessions?: sessionsUncheckedUpdateManyWithoutUserNestedInput
    traits?: traitsUncheckedUpdateManyWithoutUserNestedInput
    sources?: sourcesUncheckedUpdateManyWithoutUserNestedInput
    messages?: messagesUncheckedUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateWithoutTraitsInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsCreateNestedManyWithoutUserInput
    sessions?: sessionsCreateNestedManyWithoutUserInput
    profiles?: profilesCreateNestedOneWithoutUserInput
    sources?: sourcesCreateNestedManyWithoutUserInput
    messages?: messagesCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutTraitsInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsUncheckedCreateNestedManyWithoutUserInput
    sessions?: sessionsUncheckedCreateNestedManyWithoutUserInput
    profiles?: profilesUncheckedCreateNestedOneWithoutUserInput
    sources?: sourcesUncheckedCreateNestedManyWithoutUserInput
    messages?: messagesUncheckedCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutTraitsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTraitsInput, usersUncheckedCreateWithoutTraitsInput>
  }

  export type sourcesCreateWithoutTraitsInput = {
    id?: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
    user: usersCreateNestedOneWithoutSourcesInput
    embeddings?: embeddingsCreateNestedManyWithoutSourceInput
  }

  export type sourcesUncheckedCreateWithoutTraitsInput = {
    id?: string
    user_id: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
    embeddings?: embeddingsUncheckedCreateNestedManyWithoutSourceInput
  }

  export type sourcesCreateOrConnectWithoutTraitsInput = {
    where: sourcesWhereUniqueInput
    create: XOR<sourcesCreateWithoutTraitsInput, sourcesUncheckedCreateWithoutTraitsInput>
  }

  export type usersUpsertWithoutTraitsInput = {
    update: XOR<usersUpdateWithoutTraitsInput, usersUncheckedUpdateWithoutTraitsInput>
    create: XOR<usersCreateWithoutTraitsInput, usersUncheckedCreateWithoutTraitsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTraitsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTraitsInput, usersUncheckedUpdateWithoutTraitsInput>
  }

  export type usersUpdateWithoutTraitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUpdateManyWithoutUserNestedInput
    sessions?: sessionsUpdateManyWithoutUserNestedInput
    profiles?: profilesUpdateOneWithoutUserNestedInput
    sources?: sourcesUpdateManyWithoutUserNestedInput
    messages?: messagesUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutTraitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUncheckedUpdateManyWithoutUserNestedInput
    sessions?: sessionsUncheckedUpdateManyWithoutUserNestedInput
    profiles?: profilesUncheckedUpdateOneWithoutUserNestedInput
    sources?: sourcesUncheckedUpdateManyWithoutUserNestedInput
    messages?: messagesUncheckedUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type sourcesUpsertWithoutTraitsInput = {
    update: XOR<sourcesUpdateWithoutTraitsInput, sourcesUncheckedUpdateWithoutTraitsInput>
    create: XOR<sourcesCreateWithoutTraitsInput, sourcesUncheckedCreateWithoutTraitsInput>
    where?: sourcesWhereInput
  }

  export type sourcesUpdateToOneWithWhereWithoutTraitsInput = {
    where?: sourcesWhereInput
    data: XOR<sourcesUpdateWithoutTraitsInput, sourcesUncheckedUpdateWithoutTraitsInput>
  }

  export type sourcesUpdateWithoutTraitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutSourcesNestedInput
    embeddings?: embeddingsUpdateManyWithoutSourceNestedInput
  }

  export type sourcesUncheckedUpdateWithoutTraitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    embeddings?: embeddingsUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type usersCreateWithoutSourcesInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsCreateNestedManyWithoutUserInput
    sessions?: sessionsCreateNestedManyWithoutUserInput
    profiles?: profilesCreateNestedOneWithoutUserInput
    traits?: traitsCreateNestedManyWithoutUserInput
    messages?: messagesCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutSourcesInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsUncheckedCreateNestedManyWithoutUserInput
    sessions?: sessionsUncheckedCreateNestedManyWithoutUserInput
    profiles?: profilesUncheckedCreateNestedOneWithoutUserInput
    traits?: traitsUncheckedCreateNestedManyWithoutUserInput
    messages?: messagesUncheckedCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutSourcesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutSourcesInput, usersUncheckedCreateWithoutSourcesInput>
  }

  export type traitsCreateWithoutSourcesInput = {
    id?: string
    category: string
    key: string
    value_json: JsonNullValueInput | InputJsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at?: Date | string
    user: usersCreateNestedOneWithoutTraitsInput
  }

  export type traitsUncheckedCreateWithoutSourcesInput = {
    id?: string
    user_id: string
    category: string
    key: string
    value_json: JsonNullValueInput | InputJsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at?: Date | string
  }

  export type traitsCreateOrConnectWithoutSourcesInput = {
    where: traitsWhereUniqueInput
    create: XOR<traitsCreateWithoutSourcesInput, traitsUncheckedCreateWithoutSourcesInput>
  }

  export type traitsCreateManySourcesInputEnvelope = {
    data: traitsCreateManySourcesInput | traitsCreateManySourcesInput[]
    skipDuplicates?: boolean
  }

  export type embeddingsCreateWithoutSourceInput = {
    id?: string
    user_id: string
    vector_ref: string
    category: string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type embeddingsUncheckedCreateWithoutSourceInput = {
    id?: string
    user_id: string
    vector_ref: string
    category: string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type embeddingsCreateOrConnectWithoutSourceInput = {
    where: embeddingsWhereUniqueInput
    create: XOR<embeddingsCreateWithoutSourceInput, embeddingsUncheckedCreateWithoutSourceInput>
  }

  export type embeddingsCreateManySourceInputEnvelope = {
    data: embeddingsCreateManySourceInput | embeddingsCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutSourcesInput = {
    update: XOR<usersUpdateWithoutSourcesInput, usersUncheckedUpdateWithoutSourcesInput>
    create: XOR<usersCreateWithoutSourcesInput, usersUncheckedCreateWithoutSourcesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutSourcesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutSourcesInput, usersUncheckedUpdateWithoutSourcesInput>
  }

  export type usersUpdateWithoutSourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUpdateManyWithoutUserNestedInput
    sessions?: sessionsUpdateManyWithoutUserNestedInput
    profiles?: profilesUpdateOneWithoutUserNestedInput
    traits?: traitsUpdateManyWithoutUserNestedInput
    messages?: messagesUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutSourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUncheckedUpdateManyWithoutUserNestedInput
    sessions?: sessionsUncheckedUpdateManyWithoutUserNestedInput
    profiles?: profilesUncheckedUpdateOneWithoutUserNestedInput
    traits?: traitsUncheckedUpdateManyWithoutUserNestedInput
    messages?: messagesUncheckedUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type traitsUpsertWithWhereUniqueWithoutSourcesInput = {
    where: traitsWhereUniqueInput
    update: XOR<traitsUpdateWithoutSourcesInput, traitsUncheckedUpdateWithoutSourcesInput>
    create: XOR<traitsCreateWithoutSourcesInput, traitsUncheckedCreateWithoutSourcesInput>
  }

  export type traitsUpdateWithWhereUniqueWithoutSourcesInput = {
    where: traitsWhereUniqueInput
    data: XOR<traitsUpdateWithoutSourcesInput, traitsUncheckedUpdateWithoutSourcesInput>
  }

  export type traitsUpdateManyWithWhereWithoutSourcesInput = {
    where: traitsScalarWhereInput
    data: XOR<traitsUpdateManyMutationInput, traitsUncheckedUpdateManyWithoutSourcesInput>
  }

  export type embeddingsUpsertWithWhereUniqueWithoutSourceInput = {
    where: embeddingsWhereUniqueInput
    update: XOR<embeddingsUpdateWithoutSourceInput, embeddingsUncheckedUpdateWithoutSourceInput>
    create: XOR<embeddingsCreateWithoutSourceInput, embeddingsUncheckedCreateWithoutSourceInput>
  }

  export type embeddingsUpdateWithWhereUniqueWithoutSourceInput = {
    where: embeddingsWhereUniqueInput
    data: XOR<embeddingsUpdateWithoutSourceInput, embeddingsUncheckedUpdateWithoutSourceInput>
  }

  export type embeddingsUpdateManyWithWhereWithoutSourceInput = {
    where: embeddingsScalarWhereInput
    data: XOR<embeddingsUpdateManyMutationInput, embeddingsUncheckedUpdateManyWithoutSourceInput>
  }

  export type embeddingsScalarWhereInput = {
    AND?: embeddingsScalarWhereInput | embeddingsScalarWhereInput[]
    OR?: embeddingsScalarWhereInput[]
    NOT?: embeddingsScalarWhereInput | embeddingsScalarWhereInput[]
    id?: StringFilter<"embeddings"> | string
    user_id?: StringFilter<"embeddings"> | string
    vector_ref?: StringFilter<"embeddings"> | string
    source_id?: StringFilter<"embeddings"> | string
    category?: StringFilter<"embeddings"> | string
    chunk_meta?: JsonNullableFilter<"embeddings">
    created_at?: DateTimeFilter<"embeddings"> | Date | string
  }

  export type usersCreateWithoutMessagesInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsCreateNestedManyWithoutUserInput
    sessions?: sessionsCreateNestedManyWithoutUserInput
    profiles?: profilesCreateNestedOneWithoutUserInput
    traits?: traitsCreateNestedManyWithoutUserInput
    sources?: sourcesCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutMessagesInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsUncheckedCreateNestedManyWithoutUserInput
    sessions?: sessionsUncheckedCreateNestedManyWithoutUserInput
    profiles?: profilesUncheckedCreateNestedOneWithoutUserInput
    traits?: traitsUncheckedCreateNestedManyWithoutUserInput
    sources?: sourcesUncheckedCreateNestedManyWithoutUserInput
    voice_profiles?: voice_profilesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutMessagesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutMessagesInput, usersUncheckedCreateWithoutMessagesInput>
  }

  export type usersUpsertWithoutMessagesInput = {
    update: XOR<usersUpdateWithoutMessagesInput, usersUncheckedUpdateWithoutMessagesInput>
    create: XOR<usersCreateWithoutMessagesInput, usersUncheckedCreateWithoutMessagesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutMessagesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutMessagesInput, usersUncheckedUpdateWithoutMessagesInput>
  }

  export type usersUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUpdateManyWithoutUserNestedInput
    sessions?: sessionsUpdateManyWithoutUserNestedInput
    profiles?: profilesUpdateOneWithoutUserNestedInput
    traits?: traitsUpdateManyWithoutUserNestedInput
    sources?: sourcesUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUncheckedUpdateManyWithoutUserNestedInput
    sessions?: sessionsUncheckedUpdateManyWithoutUserNestedInput
    profiles?: profilesUncheckedUpdateOneWithoutUserNestedInput
    traits?: traitsUncheckedUpdateManyWithoutUserNestedInput
    sources?: sourcesUncheckedUpdateManyWithoutUserNestedInput
    voice_profiles?: voice_profilesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type sourcesCreateWithoutEmbeddingsInput = {
    id?: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
    user: usersCreateNestedOneWithoutSourcesInput
    traits?: traitsCreateNestedManyWithoutSourcesInput
  }

  export type sourcesUncheckedCreateWithoutEmbeddingsInput = {
    id?: string
    user_id: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
    traits?: traitsUncheckedCreateNestedManyWithoutSourcesInput
  }

  export type sourcesCreateOrConnectWithoutEmbeddingsInput = {
    where: sourcesWhereUniqueInput
    create: XOR<sourcesCreateWithoutEmbeddingsInput, sourcesUncheckedCreateWithoutEmbeddingsInput>
  }

  export type sourcesUpsertWithoutEmbeddingsInput = {
    update: XOR<sourcesUpdateWithoutEmbeddingsInput, sourcesUncheckedUpdateWithoutEmbeddingsInput>
    create: XOR<sourcesCreateWithoutEmbeddingsInput, sourcesUncheckedCreateWithoutEmbeddingsInput>
    where?: sourcesWhereInput
  }

  export type sourcesUpdateToOneWithWhereWithoutEmbeddingsInput = {
    where?: sourcesWhereInput
    data: XOR<sourcesUpdateWithoutEmbeddingsInput, sourcesUncheckedUpdateWithoutEmbeddingsInput>
  }

  export type sourcesUpdateWithoutEmbeddingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutSourcesNestedInput
    traits?: traitsUpdateManyWithoutSourcesNestedInput
  }

  export type sourcesUncheckedUpdateWithoutEmbeddingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    traits?: traitsUncheckedUpdateManyWithoutSourcesNestedInput
  }

  export type usersCreateWithoutVoice_profilesInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsCreateNestedManyWithoutUserInput
    sessions?: sessionsCreateNestedManyWithoutUserInput
    profiles?: profilesCreateNestedOneWithoutUserInput
    traits?: traitsCreateNestedManyWithoutUserInput
    sources?: sourcesCreateNestedManyWithoutUserInput
    messages?: messagesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutVoice_profilesInput = {
    id?: string
    email: string
    created_at?: Date | string
    credentials?: credentialsUncheckedCreateNestedManyWithoutUserInput
    sessions?: sessionsUncheckedCreateNestedManyWithoutUserInput
    profiles?: profilesUncheckedCreateNestedOneWithoutUserInput
    traits?: traitsUncheckedCreateNestedManyWithoutUserInput
    sources?: sourcesUncheckedCreateNestedManyWithoutUserInput
    messages?: messagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutVoice_profilesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutVoice_profilesInput, usersUncheckedCreateWithoutVoice_profilesInput>
  }

  export type usersUpsertWithoutVoice_profilesInput = {
    update: XOR<usersUpdateWithoutVoice_profilesInput, usersUncheckedUpdateWithoutVoice_profilesInput>
    create: XOR<usersCreateWithoutVoice_profilesInput, usersUncheckedCreateWithoutVoice_profilesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutVoice_profilesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutVoice_profilesInput, usersUncheckedUpdateWithoutVoice_profilesInput>
  }

  export type usersUpdateWithoutVoice_profilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUpdateManyWithoutUserNestedInput
    sessions?: sessionsUpdateManyWithoutUserNestedInput
    profiles?: profilesUpdateOneWithoutUserNestedInput
    traits?: traitsUpdateManyWithoutUserNestedInput
    sources?: sourcesUpdateManyWithoutUserNestedInput
    messages?: messagesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutVoice_profilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: credentialsUncheckedUpdateManyWithoutUserNestedInput
    sessions?: sessionsUncheckedUpdateManyWithoutUserNestedInput
    profiles?: profilesUncheckedUpdateOneWithoutUserNestedInput
    traits?: traitsUncheckedUpdateManyWithoutUserNestedInput
    sources?: sourcesUncheckedUpdateManyWithoutUserNestedInput
    messages?: messagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type credentialsCreateManyUserInput = {
    id?: string
    webauthn_credential_id: string
    public_key: string
    sign_count: number
    created_at?: Date | string
  }

  export type sessionsCreateManyUserInput = {
    id?: string
    hashed_token: string
    user_agent: string
    ip_hash: string
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type traitsCreateManyUserInput = {
    id?: string
    category: string
    key: string
    value_json: JsonNullValueInput | InputJsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at?: Date | string
    source_id?: string | null
  }

  export type sourcesCreateManyUserInput = {
    id?: string
    type: $Enums.SourceType
    title: string
    content_encrypted: Uint8Array
    iv?: string
    created_at?: Date | string
  }

  export type messagesCreateManyUserInput = {
    id?: string
    role: $Enums.RoleType
    content_encrypted: Uint8Array
    iv?: string
    audio_url?: string | null
    created_at?: Date | string
  }

  export type voice_profilesCreateManyUserInput = {
    id?: string
    provider: string
    voice_id: string
    consent_signed_at?: Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type credentialsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    webauthn_credential_id?: StringFieldUpdateOperationsInput | string
    public_key?: StringFieldUpdateOperationsInput | string
    sign_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credentialsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    webauthn_credential_id?: StringFieldUpdateOperationsInput | string
    public_key?: StringFieldUpdateOperationsInput | string
    sign_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credentialsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    webauthn_credential_id?: StringFieldUpdateOperationsInput | string
    public_key?: StringFieldUpdateOperationsInput | string
    sign_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashed_token?: StringFieldUpdateOperationsInput | string
    user_agent?: StringFieldUpdateOperationsInput | string
    ip_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type sessionsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashed_token?: StringFieldUpdateOperationsInput | string
    user_agent?: StringFieldUpdateOperationsInput | string
    ip_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type sessionsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hashed_token?: StringFieldUpdateOperationsInput | string
    user_agent?: StringFieldUpdateOperationsInput | string
    ip_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type traitsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: sourcesUpdateOneWithoutTraitsNestedInput
  }

  export type traitsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type traitsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sourcesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    traits?: traitsUpdateManyWithoutSourcesNestedInput
    embeddings?: embeddingsUpdateManyWithoutSourceNestedInput
  }

  export type sourcesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    traits?: traitsUncheckedUpdateManyWithoutSourcesNestedInput
    embeddings?: embeddingsUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type sourcesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    title?: StringFieldUpdateOperationsInput | string
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messagesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messagesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type messagesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType
    content_encrypted?: BytesFieldUpdateOperationsInput | Uint8Array
    iv?: StringFieldUpdateOperationsInput | string
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type voice_profilesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    consent_signed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type voice_profilesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    consent_signed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type voice_profilesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    voice_id?: StringFieldUpdateOperationsInput | string
    consent_signed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sample_meta?: NullableJsonNullValueInput | InputJsonValue
  }

  export type traitsCreateManySourcesInput = {
    id?: string
    user_id: string
    category: string
    key: string
    value_json: JsonNullValueInput | InputJsonValue
    confidence: number
    completeness: number
    provenance: string
    updated_at?: Date | string
  }

  export type embeddingsCreateManySourceInput = {
    id?: string
    user_id: string
    vector_ref: string
    category: string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type traitsUpdateWithoutSourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutTraitsNestedInput
  }

  export type traitsUncheckedUpdateWithoutSourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type traitsUncheckedUpdateManyWithoutSourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value_json?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    completeness?: FloatFieldUpdateOperationsInput | number
    provenance?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type embeddingsUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    vector_ref?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type embeddingsUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    vector_ref?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type embeddingsUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    vector_ref?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    chunk_meta?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}