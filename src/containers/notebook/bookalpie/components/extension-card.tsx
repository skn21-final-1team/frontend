'use client';

import { Key, RefreshCw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useExtension } from '@/containers/notebook/bookalpie/utils/use-extension';
import { ExtensionKey } from './extension-key';
import { ExtensionInfo } from './extension-info';
import * as S from './extension-card.style';

interface ExtensionCardProps {
  notebookId: number;
}

export function ExtensionCard({ notebookId }: ExtensionCardProps) {
  const { key, expiresAt, isLoading, error, isCopied, generateKey, copyKey } =
    useExtension(notebookId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={S.triggerButton()}>
          <Key className="h-4 w-4" />
          Bookalpie 연동
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className={S.dropdownContent()} align="start" sideOffset={8}>
        <DropdownMenuLabel className={S.dropdownLabel()}>
          <span>Bookalpie 연동</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className={S.keySection()}>
          <div className={S.keyRow()}>
            <span className={S.keyLabel()}>
              Bookalpie 연동 키:
            </span>
            <Button 
              onClick={(e) => {
                e.preventDefault(); 
                generateKey();
              }} 
              disabled={isLoading} 
              variant="default" 
              className={S.generateButton()}
            >
              {isLoading ? (
                <><RefreshCw className="animate-spin mr-1 h-3 w-3" />발급 중...</>
              ) : (
                <>{key ? '새 키 발급' : '키 발급'}</>
              )}
            </Button>
          </div>
          
          {error && <span className={S.errorBox()}>{error}</span>}

          {key && expiresAt && (
            <div className={S.keyContainer()}>
              <ExtensionKey syncKey={key} expiresAt={expiresAt} isCopied={isCopied} onCopy={copyKey} />
            </div>
          )}
        </div>

        {key && expiresAt && (
          <>
            <DropdownMenuSeparator />
            <div className={S.infoSection()}>
              <ExtensionInfo />
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
