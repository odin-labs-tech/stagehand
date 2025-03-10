import Browserbase from "@browserbasehq/sdk";
import { Page, BrowserContext } from "../types/page";
import { z } from "zod";
import { LLMProvider } from "../lib/llm/LLMProvider";
import { LogLine } from "./log";
import { AvailableModel, ClientOptions } from "./model";
import { LLMClient } from "../lib/llm/LLMClient";

export interface ConstructorParams {
  env: "LOCAL" | "BROWSERBASE";
  apiKey?: string;
  projectId?: string;
  verbose?: 0 | 1 | 2;
  debugDom?: boolean;
  llmProvider?: LLMProvider;
  headless?: boolean;
  logger?: (message: LogLine) => void | Promise<void>;
  domSettleTimeoutMs?: number;
  browserbaseSessionCreateParams?: Browserbase.Sessions.SessionCreateParams;
  enableCaching?: boolean;
  browserbaseSessionID?: string;
  modelName?: AvailableModel;
  llmClient?: LLMClient;
  modelClientOptions?: ClientOptions;
  /**
   * Instructions for stagehand.
   */
  systemPrompt?: string;
  /**
   * Offload Stagehand method calls to the Stagehand API.
   */
  useAPI?: boolean;
  selfHeal?: boolean;
  browserContext?: {
    context: BrowserContext;
    contextPath: string;
  };
}

export interface InitOptions {
  /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
  modelName?: AvailableModel;
  /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
  modelClientOptions?: ClientOptions;
  /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
  domSettleTimeoutMs?: number;
}

export interface InitResult {
  debugUrl: string;
  sessionUrl: string;
  sessionId: string;
}

export interface InitFromPageOptions {
  page: Page;
  /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
  modelName?: AvailableModel;
  /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
  modelClientOptions?: ClientOptions;
}

export interface InitFromPageResult {
  context: BrowserContext;
}

export interface ActOptions {
  action: string;
  modelName?: AvailableModel;
  modelClientOptions?: ClientOptions;
  /** @deprecated Vision is not supported in this version of Stagehand. */
  useVision?: boolean;
  variables?: Record<string, string>;
  domSettleTimeoutMs?: number;
}

export interface ActResult {
  success: boolean;
  message: string;
  action: string;
}

export interface ExtractOptions<T extends z.AnyZodObject> {
  instruction: string;
  schema: T;
  modelName?: AvailableModel;
  modelClientOptions?: ClientOptions;
  domSettleTimeoutMs?: number;
  useTextExtract?: boolean;
}

export type ExtractResult<T extends z.AnyZodObject> = z.infer<T>;

export interface ObserveOptions {
  instruction?: string;
  modelName?: AvailableModel;
  modelClientOptions?: ClientOptions;
  /** @deprecated Vision is not supported in this version of Stagehand. */
  useVision?: boolean;
  domSettleTimeoutMs?: number;
  returnAction?: boolean;
  onlyVisible?: boolean;
  /** @deprecated `useAccessibilityTree` is now deprecated. Use `onlyVisible` instead. */
  useAccessibilityTree?: boolean;
  drawOverlay?: boolean;
}

export interface ObserveResult {
  selector: string;
  description: string;
  backendNodeId?: number;
  method?: string;
  arguments?: string[];
}
